import { useState } from 'react';

const usePasswordValidation = () => {
    const [isLengthValid, setIsLengthValid] = useState(false);
    const [isUpperAndLowerCaseValid, setIsUpperAndLowerCaseValid] = useState(false);
    const [isNumberValid, setIsNumberValid] = useState(false);
    const [isSpecialCharValid, setIsSpecialCharValid] = useState(false);

    const validatePassword = (password: string) => {
        setIsLengthValid(password.length >= 8);
        setIsUpperAndLowerCaseValid(/^(?=.*[a-z])(?=.*[A-Z])/.test(password));
        setIsNumberValid(/\d/.test(password));
        setIsSpecialCharValid(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password));
    };

    return {
        isLengthValid,
        isUpperAndLowerCaseValid,
        isNumberValid,
        isSpecialCharValid,
        validatePassword,
    };
};

export default usePasswordValidation;