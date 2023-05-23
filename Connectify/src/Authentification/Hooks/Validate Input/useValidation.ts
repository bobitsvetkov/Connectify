import { SignupData } from "../../../types/interfaces";
import { useState } from "react";
const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/;  // Assumes a phone number is valid if it consists of exactly 10 digits
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
    const [nameError, setNameError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);

    const validateFields = (SignupData) => {
        if (!validateEmail(SignupData.email)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError(null);
        }

        if (!validatePhoneNumber(SignupData.phoneNumber)) {
            setPhoneNumberError("Invalid phone number");
        } else {
            setPhoneNumberError(null);
        }

        if (!validateName(SignupData.firstName) || !validateName(SignupData.lastName)) {
            setNameError("Name cannot be empty or exceed 50 characters");
        } else {
            setNameError(null);
        }

        if (!validateUsername(SignupData.username)) {
            setUsernameError("Invalid username.");
        } else {
            setUsernameError(null);
        }
    };

    return {
        emailError,
        phoneNumberError,
        nameError,
        usernameError,
        validateFields,
    };
};

export default useFieldValidation;