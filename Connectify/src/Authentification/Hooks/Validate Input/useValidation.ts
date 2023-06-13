import { SignUpData } from "../../../types/interfaces";
import { useState } from "react";

const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:@"]+(\.[^<>()[\]\\.,;:@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const validatePhoneNumber = (phoneNumber: string): boolean => {
    const re = /^\+?\d{1,}$/;  // Assumes a phone number is valid if it starts with an optional '+' and followed only by digits
    return re.test(phoneNumber);
}

const validateUsername = (username: string): boolean => {
    const re = /^[a-z0-9_]{3,16}$/;  // Username can contain lower case letters, digits and underscore, and must be between 3 and 16 characters long
    return re.test(username);
}

const useFieldValidation = () => {
    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
    const [firstNameError, setFirstNameError] = useState<string | null>(null);
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);

    const validateFirstName = (firstName: string): boolean => {
        if (firstName === '') {
            setFirstNameError('First name is required');
            return false;
        } else if (firstName.length > 10) {
            setFirstNameError('First name should not exceed 10 characters');
            return false;
        }
        setFirstNameError(null);
        return true;
    };

    const validateLastName = (lastName: string): boolean => {
        if (lastName === '') {
            setLastNameError('Last name is required');
            return false;
        } else if (lastName.length > 10) {
            setLastNameError('Last name should not exceed 10 characters');
            return false;
        }
        setLastNameError(null);
        return true;
    };


    const validateFields = async (data: Partial<SignUpData>): Promise<string[]> => {
        return new Promise<string[]>(resolve => {
            const errorMessages: string[] = [];

            if (data.firstName !== undefined && data.firstName !== null) {
                if (data.firstName === '') {
                    errorMessages.push('First name is required');
                } else if (!validateFirstName(data.firstName)) {
                    errorMessages.push(firstNameError || '');
                }
            }

            if (data.lastName !== undefined && data.lastName !== null) {
                if (data.lastName === '') {
                    errorMessages.push('Last name is required');
                } else if (!validateLastName(data.lastName)) {
                    errorMessages.push(lastNameError || '');
                }
            }

            if (data.email !== undefined && data.email !== null) {
                if (data.email === '') {
                    const errorMessage = 'Email is required';
                    setEmailError(errorMessage);
                    errorMessages.push(errorMessage);
                } else if (!validateEmail(data.email)) {
                    const errorMessage = "Invalid email address";
                    setEmailError(errorMessage);
                    errorMessages.push(errorMessage);
                } else {
                    setEmailError(null);
                }
            }

            if (data.phoneNumber !== undefined && data.phoneNumber !== null) {
                if (data.phoneNumber === '') {
                    const errorMessage = 'Phone number is required';
                    setPhoneNumberError(errorMessage);
                    errorMessages.push(errorMessage);
                } else if (!validatePhoneNumber(data.phoneNumber)) {
                    const errorMessage = "Invalid phone number";
                    setPhoneNumberError(errorMessage);
                    errorMessages.push(errorMessage);
                } else {
                    setPhoneNumberError(null);
                }
            }

            if (data.username !== undefined && data.username !== null) {
                if (data.username === '') {
                    setUsernameError('Username is required');
                    errorMessages.push(usernameError || '');
                } else if (!validateUsername(data.username)) {
                    setUsernameError("Invalid username.");
                    errorMessages.push(usernameError || '');
                } else {
                    setUsernameError(null);
                }
            }

            resolve(errorMessages);
        });
    };

    return {
        emailError,
        phoneNumberError,
        firstNameError,
        lastNameError,
        usernameError,
        validateFields,
        setFirstNameError,
        setLastNameError,
        validateFirstName,
        validateLastName,
        setEmailError,
        validateEmail,
        setPhoneNumberError,
        validatePhoneNumber,
        setUsernameError,
        validateUsername
    };
};

export default useFieldValidation;