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
  useToast,
} from "@chakra-ui/react";
import ColorModeSwitcher from "../Dark Mode Toggle/DarkModeToggle";
import { PasswordField } from "../Password Field/PasswordField";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useSignIn from "../../Authentification/Hooks/Sign In Hook/useSignIn";

export const MotionBox = motion(Box);

export function SignInForm() {
  const navigate = useNavigate();
  const { user, handleUserChange, handleSignIn, errorMessage } = useSignIn();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSignIn(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="6">
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your email"
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => handleUserChange("email", e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <PasswordField
            value={user.password}
            onChange={(e) => handleUserChange("password", e.target.value)}
          />
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
      </Stack>
    </form>
  );
}
