import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

interface FormFieldProps {
    label: string;
    placeholder: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isInvalid: boolean;
    isRequired?: boolean;
    errorMessage?: string;
    children?: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    placeholder,
    type,
    name,
    value,
    onChange,
    isInvalid,
    isRequired,
    errorMessage,
    children
}) => (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
        <FormLabel>{label}</FormLabel>
        <Input
            placeholder={placeholder}
            type={type}
            name={name}
            onChange={onChange}
            value={value}
        />
        {children}
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
);