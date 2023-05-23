import { SignupData } from '../../../types/interfaces';

const useValidationHandler = () => {
    const validateStepOne = ({ firstName, lastName, email, password, confirmPassword }: SignupData) => {
        if (firstName === "") {
            return "First name is required";
        }
        if (lastName === "") {
            return "Last name is required";
        }
        if (email === "") {
            return "Email is required";
        }
        if (password === "") {
            return "Password is required";
        }
        if (confirmPassword === "") {
            return "Please confirm your password";
        }
        if (password !== confirmPassword) {
            return 'The passwords do not match.';
        }
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase and one lowercase letter.";
        }
        if (!/[0-9]/.test(password)) {
            return "Password must contain at least one number.";
        }
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)) {
            return "Password must contain at least one special character.";
        }
        return null;
    };

    const validateStepTwo = ({ username, phoneNumber }: SignupData) => {
        if (username === "" || phoneNumber === "") {
            return "Please fill all the fields";
        }

        return null;
    };

    return { validateStepOne, validateStepTwo };
};

export default useValidationHandler;