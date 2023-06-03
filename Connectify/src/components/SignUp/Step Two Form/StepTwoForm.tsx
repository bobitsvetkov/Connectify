import { FormField } from "../Form Field/FormField";
import { SignUpData } from "../../../types/interfaces";

interface ValidationErrors {
    firstNameError: string | null;
    lastNameError: string | null;
    emailError: string | null;
    phoneNumberError: string | null;
    usernameError: string | null;
    passwordError: string | null;
    confirmPasswordError: string | null;
}

interface TouchedFields {
    firstName: boolean;
    lastName: boolean;
    uid: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
    username: boolean;
    phoneNumber: boolean;
    photoURL: boolean;
}

interface SignUpStepTwoFormProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    signupData: SignUpData;
    validationErrors: ValidationErrors;
    touchedFields: TouchedFields;
    usernameExists: boolean;  
    phoneNumberExists: boolean;  
    emailExists: boolean;
}

export const SignUpStepTwoForm: React.FC<SignUpStepTwoFormProps> = ({
    handleChange,
    signupData,
    validationErrors,
    touchedFields,
    usernameExists,  
    phoneNumberExists,
    emailExists  
}) => {
    console.log('usernameExists in SignUpStepTwoForm:', usernameExists);
    return (
        <>
            <FormField
                label="Username"
                placeholder="Enter your username"
                type="text"
                name="username"
                value={signupData.username}
                onChange={handleChange}
                isInvalid={touchedFields.username && (!!validationErrors.usernameError || usernameExists)}
                errorMessage={usernameExists ? 'This username is already taken.' : validationErrors.usernameError}
            />
            <FormField
                label="Phone Number"
                placeholder="Enter your phone number"
                type="tel"
                name="phoneNumber"
                value={signupData.phoneNumber}
                onChange={handleChange}
                isInvalid={touchedFields.phoneNumber && (!!validationErrors.phoneNumberError || phoneNumberExists)}  
                errorMessage={phoneNumberExists ? 'This phone number is already in use.' : validationErrors.phoneNumberError}  
            />
            <FormField
                label="Email"
                placeholder="Enter your email"
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleChange}
                isRequired
                isInvalid={touchedFields.email && (!!validationErrors.emailError || emailExists)}
                errorMessage={emailExists ? 'This email is already in use.' : validationErrors.emailError}
            />
        </>
    );
}