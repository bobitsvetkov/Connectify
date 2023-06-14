import {
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
    useDisclosure,
    useMergeRefs,
    FormErrorMessage
} from '@chakra-ui/react'
import { forwardRef, useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

export const PasswordField = forwardRef<HTMLInputElement, InputProps & {
    errorMessage?: string | null;
    isInvalid?: boolean;
    isRequired?: boolean;
    label?: string; 
}>((props, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)

    const mergeRef = useMergeRefs(inputRef, ref)
    const onClickReveal = () => {
        onToggle()
        if (inputRef.current) {
            inputRef.current.focus({ preventScroll: true })
        }
    }

    const { isInvalid, errorMessage, isRequired, label, ...inputProps } = props; 

    return (
        <FormControl isInvalid={isInvalid} isRequired={isRequired}>  
            <FormLabel htmlFor="password">{label}</FormLabel>
            <InputGroup>
                <InputRightElement>
                    <IconButton
                        variant="link"
                        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                    />
                </InputRightElement>
                <Input
                    id="password"
                    ref={mergeRef}
                    name="password"
                    type={isOpen ? 'text' : 'password'}
                    autoComplete="current-password"
                    {...inputProps}
                />
            </InputGroup>
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
    )
})

PasswordField.displayName = 'PasswordField'
