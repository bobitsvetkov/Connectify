import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Link,
  Button,
  Flex,
  Stack,
  Divider,
  FormErrorMessage,
} from "@chakra-ui/react";
import { PasswordField } from "../Password Field/PasswordField";
import { motion } from "framer-motion";
import useSignIn from "../../Authentification/Hooks/Sign In Hook/useSignIn";
import ForgotPassModal from "../ForgetPassword/ForgerPasswordModal";
import { useState } from "react";

export const MotionBox = motion(Box);

export function SignInForm() {
  const { user, handleUserChange, handleSignIn, errorMessage } = useSignIn();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleForgotPassword = () => {
    console.log("Forgot password");
  };

  const handleResetPasswordSuccess = () => {
    console.log("Password reset email sent");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSignIn(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="6">
        <FormControl isRequired isInvalid={!!errorMessage.email}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your email"
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => handleUserChange("email", e.target.value)}
          />
          <FormErrorMessage>{errorMessage.email}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errorMessage.password}>
          <FormLabel>Password</FormLabel>
          <PasswordField
            value={user.password}
            onChange={(e) => handleUserChange("password", e.target.value)}
          />
          <FormErrorMessage>{errorMessage.password}</FormErrorMessage>
        </FormControl>
        <Flex justifyContent="space-between" alignItems="center">
          <Checkbox name="persistent">Remember me</Checkbox>
          <Link onClick={handleOpenModal} fontWeight="bold">
            Forgot password
          </Link>
          <ForgotPassModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onForgotPass={handleForgotPassword}
            onSuccess={handleResetPasswordSuccess}
          />
        </Flex>
        <Button type="submit" width="full" mt={4}>
          Sign in
        </Button>
        <Divider my="6" />
      </Stack>
    </form>
  );
}
