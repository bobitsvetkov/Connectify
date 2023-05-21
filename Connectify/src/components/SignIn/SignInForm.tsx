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
import { OAuthButtonGroup } from "../SignIn Buttons/AuthButtonsGroup";
import { motion } from 'framer-motion';

export const MotionBox = motion(Box);

export function SignInForm() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
            persistent: event.target.persistent.checked,
        };
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing="6">
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder="Enter your email" type="email" name="email" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <PasswordField />
                </FormControl>
                <Flex justifyContent="space-between" alignItems="center">
                    <Checkbox name="persistent">Remember me</Checkbox>
                    <Link href="#replace-with-a-link" fontWeight="bold">
                        Forgot password
                    </Link>
                </Flex>
                <Button type="submit" width="full" mt={4}>
                    Sign in
                </Button>
                <Divider my="6" />
                <OAuthButtonGroup />
                <Flex justifyContent="center">
                    <Text>Don't have an account?</Text>
                    <Button variant="link" onClick={() => navigate('/signup')} fontWeight="bold">
                        Sign Up
                    </Button>
                </Flex>
            </Stack>
        </form>
    );
}
