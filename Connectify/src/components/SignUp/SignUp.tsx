import {
  Button,
  Stack,
} from "@chakra-ui/react";
import useSignUp from "../../Authentification/Hooks/SignUp Hook/useSignUp";
import { SignUpStepOneForm } from "./Step One Form/StepOneForm";
import { SignUpStepTwoForm } from "./Step Two Form/StepTwoForm";
import usePasswordValidation from "../../Authentification/Password Hook/usePassValid";
import useFieldValidation from "../../Authentification/Hooks/Validate Input/useValidation";

export function SignUpForm() {
    const {
        signupData,
        handleSignupDataChange,
        handleSignUp,
        step,
        setStep,
        validationErrors,
        touchedFields,
        handleNext,
    } = useSignUp();

    const passwordValidationStates = usePasswordValidation();

    const handleChange = (event) => {
        handleSignupDataChange(event.target.name, event.target.value);
        if (event.target.name === 'password') {
            passwordValidationStates.validatePassword(event.target.value);
        }
    };

    const handleNextClick = (event) => {
        event.preventDefault();
        handleNext(event);
    };

    const handleSubmitClick = (event) => {
        event.preventDefault();
        handleSignUp(event);
    };

    return (
        <form noValidate>
            <Stack spacing="6">
                {step === 1 ? (
                    <SignUpStepOneForm
                        handleChange={handleChange}
                        signupData={signupData}
                        validationErrors={validationErrors}
                        touchedFields={touchedFields}
                        passwordValidationStates={passwordValidationStates}
                    />
                ) : (
                    <SignUpStepTwoForm
                        handleChange={handleChange}
                        signupData={signupData}
                        validationErrors={validationErrors}
                        touchedFields={touchedFields}
                        passwordValidationStates={passwordValidationStates}
                    />
                )}
                <Button
                    type="button" 
                    width="full"
                    mt={4}
                    onClick={step === 1 ? handleNextClick : handleSubmitClick}
                >
                    {step === 1 ? "Next" : "Sign Up"}
                </Button>
            </Stack>
        </form>
    );
}