import Popup from "reactjs-popup";
import { Box, Icon, useColorModeValue } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { PasswordValidationStates } from '../SignUp/Step One Form/StepOneForm'
interface PasswordValidationPopupProps {
    passwordValidationStates: PasswordValidationStates;
    children: React.ReactNode;
}

const PasswordValidationPopup: React.FC<PasswordValidationPopupProps> = ({ passwordValidationStates, children }) => {
    const { isLengthValid, isUpperAndLowerCaseValid, isNumberValid, isSpecialCharValid } = passwordValidationStates;

    const validationRules = [
        { label: "At least 8 characters", isValid: isLengthValid },
        { label: "At least 1 uppercase and 1 lowercase letter", isValid: isUpperAndLowerCaseValid },
        { label: "At least 1 number", isValid: isNumberValid },
        { label: "At least 1 special character", isValid: isSpecialCharValid }
    ];

    return (
        <Popup
            trigger={children as JSX.Element}
            position="right center"
            on="focus"
            arrow={false}
            contentStyle={{ width: "auto", borderRadius: "8px" }}
        >
            <Box bgColor={useColorModeValue("gray.200", "gray.700")} p={4} rounded="md">
                {validationRules.map((rule, index) => (
                    <Box key={index} display="flex" alignItems="center" color={rule.isValid ? "green.500" : "red.500"}>
                        <Icon as={rule.isValid ? CheckIcon : CloseIcon} mr={2} boxSize={4} />
                        {rule.label}
                    </Box>
                ))}
            </Box>
        </Popup>
    );
};

export default PasswordValidationPopup;
