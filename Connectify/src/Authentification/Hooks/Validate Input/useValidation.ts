import { SignupData } from '../../../types/interfaces';

const useValidationHandler = () => {
    const validateStepOne = ({ firstName, lastName, email, password, confirmPassword }: SignupData) => {
        if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "") {
            return "Please fill all the fields";
        }

        if (password !== confirmPassword) {
            return 'The passwords do not match.';
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