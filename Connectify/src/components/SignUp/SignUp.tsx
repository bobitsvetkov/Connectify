import React from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Link,
    Button,
    Text,
    Flex,
    useColorModeValue,
    VStack,
    Grid,
    Stack,
    Divider,
    Alert,
    AlertIcon,
    AlertTitle,
    FormErrorMessage,
    AlertDescription
} from "@chakra-ui/react";
import ColorModeSwitcher from "../Dark Mode Toggle/DarkModeToggle";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { PasswordField } from "../Password Field/PasswordField";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSignUp from "../../Authentification/Hooks/SignUp Hook/useSignUp";
import LandingPage from "../../pages/LandingPage";
import { useState } from "react";
import PasswordValidationPopup from "../Password Popup/PasswordPopup";
const MotionBox = motion(Box);
export function SignUpForm() {
    const navigate = useNavigate();
    const { signupData, errorMessage, handleSignupDataChange, handleSignUp, step, setStep, passwordValidationStates } = useSignUp();

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSignUp(event);
    };

    const handleChange = (event) => {
        handleSignupDataChange(event.target.name, event.target.value);
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <Stack spacing="6">
                {step === 1 ? (
                    <>
                        <FormControl isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input placeholder="Enter your first name" type="text" name="firstName" onChange={handleChange} value={signupData.firstName} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <Input placeholder="Enter your last name" type="text" name="lastName" onChange={handleChange} value={signupData.lastName} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="Enter your email" type="email" name="email" onChange={handleChange} value={signupData.email} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <PasswordValidationPopup passwordValidationStates={passwordValidationStates}>
                                <PasswordField name="password" onChange={handleChange} value={signupData.password} />
                            </PasswordValidationPopup>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Confirm Password</FormLabel>
                            <PasswordField name="confirmPassword" onChange={handleChange} value={signupData.confirmPassword} />
                        </FormControl>
                    </>
                ) : (
                    <>
                        <FormControl>
                            <FormLabel>Nickname</FormLabel>
                            <Input placeholder="Enter your nickname" type="text" name="username" onChange={handleChange} value={signupData.username} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Phone Number</FormLabel>
                            <Input placeholder="Enter your phone number" type="tel" name="phoneNumber" onChange={handleChange} value={signupData.phoneNumber} />
                        </FormControl>
                    </>
                )}
                {errorMessage && (
                    <Alert status="error" variant="left-accent" borderRadius="md" mt={4}>
                        <AlertIcon boxSize="20px" />
                        <AlertTitle mr={2}>Error:</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}
                <Button type="submit" width="full" mt={4}>
                    {step === 1 ? 'Next' : 'Sign Up'}
                </Button>
                <Flex justifyContent="center">
                    <Text>Already have an account?</Text>
                    <Button variant="link" onClick={() => navigate('/signin')} fontWeight="bold">
                        Sign In
                    </Button>
                </Flex>
            </Stack>
        </form>
    );
}

export default function SignUpPage() {
    return (
        <LandingPage
            welcomeText="Welcome"
            detailsText="Please create an account to get started."
            FormComponent={SignUpForm}
        />
    );
}