import { Grid } from "@chakra-ui/react";
import { FormField } from "../Form Field/FormField";
import PasswordValidationPopup from "../../Password Popup/PasswordPopup";
import useSignUp from "../../../Authentification/Hooks/SignUp Hook/useSignUp";
import { SignUpData } from "../../../types/interfaces";
import { PasswordField } from "../../Password Field/PasswordField";

const {
    passwordValidationStates,
} = useSignUp();


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

interface SignUpStepOneFormProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    signupData: SignUpData;
    validationErrors: ValidationErrors;
    touchedFields: TouchedFields;
}

export const SignUpStepOneForm: React.FC<SignUpStepOneFormProps> = ({ handleChange, signupData, validationErrors, touchedFields }) => {
    return (
        <>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <FormField
                    label="First Name"
                    placeholder="Enter your first name"
                    type="text"
                    name="firstName"
                    value={signupData.firstName}
                    onChange={handleChange}
                    isRequired
                    isInvalid={touchedFields.firstName && !!validationErrors.firstNameError}
                    errorMessage={validationErrors.firstNameError}
                />
                <FormField
                    label="Last Name"
                    placeholder="Enter your last name"
                    type="text"
                    name="lastName"
                    value={signupData.lastName}
                    onChange={handleChange}
                    isRequired
                    isInvalid={touchedFields.lastName && !!validationErrors.lastNameError}
                    errorMessage={validationErrors.lastNameError}
                />
                <FormField
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    value={signupData.password}
                    onChange={handleChange}
                    isRequired
                    isInvalid={touchedFields.password && !!validationErrors.passwordError}
                    errorMessage={validationErrors.passwordError}
                >
                    <PasswordValidationPopup
                        passwordValidationStates={passwordValidationStates}
                    >
                        <PasswordField
                            name="password"
                            onChange={handleChange}
                            value={signupData.password}
                        />
                    </PasswordValidationPopup>
                </FormField>
                <FormField
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    type="password"
                    name="confirmPassword"
                    value={signupData.confirmPassword}
                    onChange={handleChange}
                    isRequired
                    isInvalid={touchedFields.confirmPassword && !!validationErrors.confirmPasswordError}
                    errorMessage={validationErrors.confirmPasswordError}
                />
            </Grid>
        </>
    );
}