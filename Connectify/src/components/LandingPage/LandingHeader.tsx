import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import AuthModal from "./AuthModal";
import ColorModeSwitcher from "../Dark Mode Toggle/DarkModeToggle";

export default function LandingHeader({ welcomeText, detailsText }) {
  const { isOpen, onToggle } = useDisclosure();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const handleSignInClick = () => {
    setIsSignInOpen(true);
  };

  const handleCloseSignIn = () => {
    setIsSignInOpen(false);
  };

  const handleSignUpClick = () => {
    setIsSignUpOpen(true);
    setFormComponent("signup");
  };

  const handleCloseSignUp = () => {
    setIsSignUpOpen(false);
  };
  const [formComponent, setFormComponent] = useState("signin");

  return (
    <Box>
      <Flex
        bg={useColorModeValue("#f57c73", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        ></Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Connectify
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}></Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            fontSize={"lg"}
            href={"#"}
            onClick={handleSignInClick}
            color={"grey.700"}
            variant={"ghost"}
          >
            Sign In
          </Button>

          <AuthModal
            isOpen={isSignInOpen}
            onClose={handleCloseSignIn}
            formComponent={formComponent}
            setFormComponent={setFormComponent}
            welcomeText={welcomeText}
            detailsText={detailsText}
          />

          <Button
            as={"a"}
            fontSize={"lg"}
            fontWeight={600}
            color={useColorModeValue("white", "#f57c73")}
            href={"#"}
            onClick={handleSignUpClick}
            _hover={{
              bg: "gray.700",
            }}
            variant={"ghost"}
            size={"xl"}
          >
            Sign Up
          </Button>
          <Flex justifyContent="flex-end" width="100%">
            <ColorModeSwitcher />
          </Flex>
          <AuthModal
            isOpen={isSignUpOpen}
            onClose={handleCloseSignUp}
            formComponent={formComponent}
            setFormComponent={setFormComponent}
            welcomeText={welcomeText}
            detailsText={detailsText}
          />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity></Collapse>
    </Box>
  );
}
