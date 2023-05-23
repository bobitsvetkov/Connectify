import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupData } from '../../../types/interfaces';
import useToastHandler from '../../../components/Toast/toastHandler';
import useValidationHandler from '../Validate Input/useValidation';
import useFirebaseHandler from '../Firebase Auth Hook/useFirebaseAuth';
import usePasswordValidation from '../../Password Hook/usePassValid';

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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { validateStepOne, validateStepTwo } = useValidationHandler();
    const { checkUsernameExists, createUser } = useFirebaseHandler();
    const showToast = useToastHandler();

    const {
        isLengthValid,
        isUpperAndLowerCaseValid,
        isNumberValid,
        isSpecialCharValid,
        validatePassword
    } = usePasswordValidation();

    const handleSignupDataChange = (name: keyof SignupData, value: string) => {
        setSignupData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        
        if (name === 'password') {
            validatePassword(value);
        }
    };

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (step === 1) {
            const error = validateStepOne(signupData);
            if (error) {
                setErrorMessage(error);
                return;
            }
            setErrorMessage(null); // clear error message
            setStep(2);
        } else {
            const error = validateStepTwo(signupData);
            if (error) {
                setErrorMessage(error);
                return;
            }
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
        passwordValidationStates: {
            isLengthValid,
            isUpperAndLowerCaseValid,
            isNumberValid,
            isSpecialCharValid,
        },
    };
};
export default useSignUp;