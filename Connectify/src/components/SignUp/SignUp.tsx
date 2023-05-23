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
  AlertDescription,
} from "@chakra-ui/react";
import ColorModeSwitcher from "../Dark Mode Toggle/DarkModeToggle";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { PasswordField } from "../Password Field/PasswordField";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useSignUp from "../../Authentification/Hooks/SignUp Hook/useSignUp";
import LandingPage from "../../pages/LandingPage";
import { useState } from "react";
import PasswordValidationPopup from "../Password Popup/PasswordPopup";
const MotionBox = motion(Box);
export function SignUpForm() {
  const navigate = useNavigate();
  const {
    signupData,
    errorMessage,
    handleSignupDataChange,
    handleSignUp,
    step,
    setStep,
    passwordValidationStates,
    validationErrors,
    touchedFields,
  } = useSignUp();

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
                        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                            <FormControl
                                isRequired
                                isInvalid={touchedFields.firstName && !!validationErrors.firstNameError}
                            >
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    placeholder="Enter your first name"
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                    value={signupData.firstName}
                                />
                                <FormErrorMessage>{validationErrors.firstNameError}</FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isRequired
                                isInvalid={touchedFields.lastName && !!validationErrors.lastNameError}
                            >
                                <FormLabel>Last Name</FormLabel>
                                <Input
                                    placeholder="Enter your last name"
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                    value={signupData.lastName}
                                />
                                <FormErrorMessage>{validationErrors.lastNameError}</FormErrorMessage>
                            </FormControl>
                        </Grid>
                        <FormControl
                            isRequired
                            isInvalid={touchedFields.password && !!validationErrors.passwordError}
                        >
                            <FormLabel>Password</FormLabel>
                            <PasswordValidationPopup
                                passwordValidationStates={passwordValidationStates}
                            >
                                <PasswordField
                                    name="password"
                                    onChange={handleChange}
                                    value={signupData.password}
                                />
                            </PasswordValidationPopup>
                            <FormErrorMessage>{validationErrors.passwordError}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={touchedFields.confirmPassword && !!validationErrors.confirmPasswordError}
                        >
                            <FormLabel>Confirm Password</FormLabel>
                            <PasswordField
                                name="confirmPassword"
                                onChange={handleChange}
                                value={signupData.confirmPassword}
                            />
                            <FormErrorMessage>{validationErrors.confirmPasswordError}</FormErrorMessage>
                        </FormControl>
                    </>
                ) : (
                    <>
                        <FormControl
                            isInvalid={touchedFields.username && !!validationErrors.usernameError}
                        >
                            <FormLabel>Username</FormLabel>
                            <Input
                                placeholder="Enter your nickname"
                                type="text"
                                name="username"
                                onChange={handleChange}
                                value={signupData.username}
                            />
                            <FormErrorMessage>{validationErrors.usernameError}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={touchedFields.phoneNumber && !!validationErrors.phoneNumberError}
                        >
                            <FormLabel>Phone Number</FormLabel>
                            <Input
                                placeholder="Enter your phone number"
                                type="tel"
                                name="phoneNumber"
                                onChange={handleChange}
                                value={signupData.phoneNumber}
                            />
                            <FormErrorMessage>{validationErrors.phoneNumberError}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={touchedFields.email && !!validationErrors.emailError}
                        >
                            <FormLabel>Email</FormLabel>
                            <Input
                                placeholder="Enter your email"
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={signupData.email}
                            />
                            <FormErrorMessage>{validationErrors.emailError}</FormErrorMessage>
                        </FormControl>
                    </>
                )}
                <Button type="submit" width="full" mt={4}>
                    {step === 1 ? "Next" : "Sign Up"}
                </Button>
            </Stack>
        </form>
    );
}
