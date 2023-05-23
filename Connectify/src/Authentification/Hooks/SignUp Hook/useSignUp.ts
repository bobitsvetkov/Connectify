import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupData } from '../../../types/interfaces';
import useToastHandler from '../../../components/Toast/toastHandler';
import useValidationHandler from '../Validate Input/useValidation';
import useFirebaseHandler from '../Firebase Auth Hook/useFirebaseAuth';
import usePasswordValidation from '../../Password Hook/usePassValid';
import useFieldValidation from '../Validate Input/useValidation';
import { useEffect } from 'react';

const useSignUp = () => {
    const [step, setStep] = useState(1);
    const [signupData, setSignupData] = useState<SignupData>({
        firstName: '',
        lastName: '',
        id: '',
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        phoneNumber: '',
        photoURL: '',
    });

    const [touchedFields, setTouchedFields] = useState({
        firstName: false,
        lastName: false,
        id: false,
        email: false,
        password: false,
        confirmPassword: false,
        username: false,
        phoneNumber: false,
        photoURL: false,
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { checkUsernameExists, createUser } = useFirebaseHandler();
    const showToast = useToastHandler();

    const {
        isLengthValid,
        isUpperAndLowerCaseValid,
        isNumberValid,
        isSpecialCharValid,
        validatePassword
    } = usePasswordValidation();

    const {
        emailError,
        phoneNumberError,
        nameError,
        usernameError,
        validateFields,
    } = useFieldValidation();

    const handleSignupDataChange = (name: keyof SignupData, value: string) => {
        const newSignupData = {
            ...signupData,
            [name]: value,
        };
        setSignupData(newSignupData);

        setTouchedFields({
            ...touchedFields,
            [name]: true,
        });

        validateFields(newSignupData);

        if (name === 'password' || name === 'confirmPassword') {
            validatePassword(value);
        }
    };

    // Add a useEffect hook to validate fields whenever signupData changes
    useEffect(() => {
        validateFields(signupData);
    }, [signupData, validateFields]);

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate fields
        validateFields(signupData);

        let localPasswordError = null;
        // Validate password confirmation
        if (signupData.password !== signupData.confirmPassword) {
            localPasswordError = "Passwords do not match";
            setPasswordError(localPasswordError);
        } else {
            setPasswordError(null);
        }

        // If step === 1, proceed to the next step as long as the password confirmation validation passed
        if (step === 1 && !localPasswordError) {
            setStep(2);
        } else if (step !== 1) {
            // If step !== 1, do not proceed with Firebase operations if any validation errors exist
            if (emailError || phoneNumberError || nameError || usernameError || passwordError || localPasswordError) {
                return;
            }

            // Proceed with Firebase operations
            const usernameExists = await checkUsernameExists(signupData.username);
            if (usernameExists) {
                setErrorMessage('This username is already taken.');
                return;
            }
            try {
                await createUser(signupData);
                setErrorMessage(null); // clear error message
                navigate('/home');
                showToast("Account created.", "You've successfully signed up!", "success");
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("An unknown error occurred.");
                }
            }
        }
    };

    return {
        signupData,
        errorMessage,
        handleSignupDataChange,
        handleSignUp,
        step,
        setStep,
        touchedFields,
        passwordValidationStates: {
            isLengthValid,
            isUpperAndLowerCaseValid,
            isNumberValid,
            isSpecialCharValid,
        },
        validationErrors: {
            nameError,
            emailError,
            phoneNumberError,
            usernameError,
            passwordError
        }
    };
};

export default useSignUp;