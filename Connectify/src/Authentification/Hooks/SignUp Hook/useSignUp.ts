import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpData } from '../../../types/interfaces';
import useToastHandler from '../../../components/Toast/toastHandler';
import useFirebaseHandler from '../Firebase Auth Hook/useFirebaseAuth';
import usePasswordValidation from '../../Password Hook/usePassValid';
import useFieldValidation from '../Validate Input/useValidation';
import { useEffect } from 'react';

const useSignUp = () => {
    const [step, setStep] = useState(1);
    const [formSubmitted, setFormSubmitted] = useState(false); 
    const [usernameExists, setUsernameExists] = useState<boolean>(false);
    const [emailExists, setEmailExists] = useState<boolean>(false);
    const [phoneNumberExists, setPhoneNumberExists] = useState<boolean>(false);
    const [signupData, setSignupData] = useState<SignUpData>({
        firstName: '',
        lastName: '',
        uid: '',
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
        uid: false,
        email: false,
        password: false,
        confirmPassword: false,
        username: false,
        phoneNumber: false,
        photoURL: false,
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { checkUsernameExists, createUser, checkPhoneNumberExists } = useFirebaseHandler();
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
    } = useFieldValidation();

    const handleSignupDataChange = (name: keyof SignUpData, value: string) => {
        const newSignupData = {
            ...signupData,
            [name]: value,
        };
        setSignupData(newSignupData);

        setTouchedFields({
            ...touchedFields,
            [name]: true,
        });

        // Existing field validation
        if (name === 'firstName') {
            validateFirstName(value);
        }
        if (name === 'lastName') {
            validateLastName(value);
        }

        // Add validation for email, phoneNumber and username
        if (name === 'email') {
            if (value === '') {
                setEmailError('Email is required');
            } else if (!validateEmail(value)) {
                setEmailError("Invalid email address");
            } else {
                setEmailError(null);
            }
        }
        if (name === 'phoneNumber') {
            if (value === '') {
                setPhoneNumberError('Phone number is required');
            } else if (!validatePhoneNumber(value)) {
                setPhoneNumberError("Invalid phone number");
            } else {
                setPhoneNumberError(null);
            }
        }
        if (name === 'username') {
            if (value === '') {
                setUsernameError('Username is required');
            } else if (!validateUsername(value)) {
                setUsernameError("Invalid username");
            } else {
                setUsernameError(null);
            }
        }
        console.log('handleSignupDataChange:', name, value);
        // Password validation
        if (name === 'password' || name === 'confirmPassword') {
            validatePassword(value);
        }
    };


    const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("handleNext function called."); 
        setFormSubmitted(true);

        setTouchedFields({
            ...touchedFields,
            firstName: true,
            lastName: true,
            password: true,
            confirmPassword: true,
        });

        const errorMessages = await validateFields({
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            password: signupData.password,
            confirmPassword: signupData.confirmPassword,
        });

        console.log("Signup data:", signupData); 
        console.log("Validation error messages:", errorMessages); 

        if (signupData.password !== signupData.confirmPassword) {
            const mismatchError = "Passwords do not match";
            errorMessages.push(mismatchError);
            setPasswordError(mismatchError); 
            setConfirmPasswordError(mismatchError); 
        }

        if (errorMessages.length > 0) {
            console.log("Errors found, not proceeding to next step."); 
            setErrorMessage(errorMessages.join(' '));
            return;
        }

        // Clear any existing errors
        setErrorMessage(null);

        // If no errors, move to the next step
        console.log("No errors found, proceeding to next step."); 
        setStep(step + 1);
    };


    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true);

        // Set all fields to touched when the form is submitted
        setTouchedFields({
            firstName: true,
            lastName: true,
            uid: true,
            email: true,
            password: true,
            confirmPassword: true,
            username: true,
            phoneNumber: true,
            photoURL: true,
        });

        const errorMessages = await validateFields(signupData);

        if (signupData.password !== signupData.confirmPassword) {
            errorMessages.push("Passwords do not match");
        }

        if (errorMessages.length > 0) {
            setErrorMessage(errorMessages.join(' '));
            return;
        }

        const usernameExists = await checkUsernameExists(signupData.username);
        console.log('usernameExists:', usernameExists);  
        setUsernameExists(usernameExists);
        if (usernameExists) {
            setErrorMessage('This username is already taken.');
            return;
        }

        const phoneNumberExists = await checkPhoneNumberExists(signupData.phoneNumber);
        console.log('phoneNumberExists:', phoneNumberExists);  
        setPhoneNumberExists(phoneNumberExists);
        if (phoneNumberExists) {
            setErrorMessage('This phone number is already in use.');
            return;
        }
        
        try {
            await createUser(signupData);
            setErrorMessage(null); // clear error message
            navigate('/home');
            showToast("Account created.", "You've successfully signed up!", "success");
        } catch (error) {
            console.log(error.code);
            if (error.code === 'auth/email-already-in-use') {
                setEmailExists(true);
                setErrorMessage('This email is already in use.');
            } else if (error instanceof Error) {
                setEmailExists(false);
                setErrorMessage(error.message);
            } else {
                setEmailExists(false);
                setErrorMessage("An unknown error occurred.");
            }
        }
    };

    return {
        signupData,
        errorMessage,
        handleSignupDataChange,
        handleSignUp,
        handleNext,
        usernameExists,
        phoneNumberExists,
        emailExists,
        step,
        setStep,
        formSubmitted,
        touchedFields,
        passwordValidationStates: {
            isLengthValid,
            isUpperAndLowerCaseValid,
            isNumberValid,
            isSpecialCharValid,
        },
        validationErrors: {
            firstNameError,
            lastNameError,
            emailError,
            phoneNumberError,
            usernameError,
            passwordError,
            confirmPasswordError
        }
    };
};

export default useSignUp;