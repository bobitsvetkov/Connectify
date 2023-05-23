import { SignupData } from "../../../types/interfaces";
import { useState } from "react";
const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePhoneNumber = (phoneNumber) => {
    const re = /^\+?\d{1,}$/;  // Assumes a phone number is valid if it starts with an optional '+' and followed only by digits
    return re.test(phoneNumber);
}

const validateUsername = (username) => {
    const re = /^[a-z0-9_]{3,16}$/;  // Username can contain lower case letters, digits and underscore, and must be between 3 and 16 characters long
    return re.test(username);
}

const validateName = (name) => {
    return name !== '' && name.length <= 50;  // Name cannot be empty and should not exceed 50 characters
}
const useFieldValidation = () => {
    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
    const [firstNameError, setFirstNameError] = useState<string | null>(null);
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);

    const validateFirstName = (firstName) => {
        if (firstName === '') {
            setFirstNameError('First name is required');
            return false;
        } else if (firstName.length > 50) {
            setFirstNameError('First name should not exceed 50 characters');
            return false;
        }
        setFirstNameError(null);
        return true;
    };

    const validateLastName = (lastName) => {
        if (lastName === '') {
            setLastNameError('Last name is required');
            return false;
        } else if (lastName.length > 50) {
            setLastNameError('Last name should not exceed 50 characters');
            return false;
        }
        setLastNameError(null);
        return true;
    };

    const validateFields = (signupData) => {
        validateFirstName(signupData.firstName);
        validateLastName(signupData.lastName);

        if (!validateEmail(signupData.email)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError(null);
        }

        if (!validatePhoneNumber(signupData.phoneNumber)) {
            setPhoneNumberError("Invalid phone number");
        } else {
            setPhoneNumberError(null);
        }

        if (!validateUsername(signupData.username)) {
            setUsernameError("Invalid username.");
        } else {
            setUsernameError(null);
        }
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
    };
};

export default useFieldValidation;