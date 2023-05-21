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
    Divider
} from "@chakra-ui/react";
import ColorModeSwitcher from "../Dark Mode Toggle/DarkModeToggle";
import { PasswordField } from "../Password Field/PasswordField";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSignUp from "../../Authentification/Hooks/SignUp Hook/useSignUp";
const MotionBox = motion(Box);
function SignUpForm() {
    const navigate = useNavigate();
    const { signupData, errorMessage, handleSignupDataChange, handleSignUp, step, setStep } = useSignUp();

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSignUp(event);
    };

    const handleChange = (event) => {
        console.log("Handle change", event.target.name, event.target.value); // Add console log
        handleSignupDataChange(event.target.name, event.target.value);
    };
    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing="6">
                {step === 1 ? (
                    <>
                        <FormControl isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input placeholder="Enter your first name" type="text" name="firstName" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <Input placeholder="Enter your last name" type="text" name="lastName" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="Enter your email" type="email" name="email" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <PasswordField name="password" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Confirm Password</FormLabel>
                            <PasswordField name="confirmPassword" onChange={handleChange} />
                        </FormControl>
                    </>
                ) : (
                    <>
                            <FormControl>
                                <FormLabel>Nickname</FormLabel>
                                <Input placeholder="Enter your nickname" type="text" name="username" onChange={handleChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Phone Number</FormLabel>
                                <Input placeholder="Enter your phone number" type="tel" name="phoneNumber" onChange={handleChange} />
                            </FormControl>
                    </>
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
    const bgImage = useColorModeValue(
        'https://images.unsplash.com/photo-1527181152855-fc03fc7949c8',
        'https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831'
    );

    return (
        <Grid templateColumns="repeat(6, 1fr)" gap={6} h="100vh" width="100vw">
            <Flex alignItems="center" justifyContent="flex-end" gridColumn="span 3" mr={8}>
                <VStack p={8} maxWidth="500px" width="full" spacing={6} boxShadow="lg" rounded="lg" bg={useColorModeValue('white', 'gray.800')}>
                    <Flex justifyContent="flex-end" width="100%">
                        <ColorModeSwitcher />
                    </Flex>
                    <Box textAlign="center">
                        <Text fontSize="2xl" fontWeight="bold">Welcome</Text>
                        <Text>Please create an account to get started.</Text>
                    </Box>
                    <Box w="100%">
                        <SignUpForm />
                    </Box>
                </VStack>
            </Flex>
            <MotionBox
                key={bgImage}
                bgImage={`url(${bgImage})`}
                bgPos="center"
                bgSize="cover"
                gridColumn="span 3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            />
        </Grid>
    );
}