import React from "react";
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  VStack,
  Grid,
  useMediaQuery,
  Container,
} from "@chakra-ui/react";
import ColorModeSwitcher from "../components/Dark Mode Toggle/DarkModeToggle";
import { MotionBox } from "../components/SignIn/SignIn";
import { SignInForm } from "../components/SignIn/SignIn";
import { SignUpForm } from "../components/SignUp/SignUp";
import { LandingPageProps } from "../types/interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";
import ActiveUsers from "../components/ActiveUsers";

const LandingPage: React.FC<LandingPageProps> = ({
  welcomeText,
  detailsText,
}) => {
  const bgImage = useColorModeValue(
    "https://images.unsplash.com/photo-1486078695445-0497c2f58cfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1590418606746-018840f9cd0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  );

  const [formComponent, setFormComponent] = useState("signin");

  return (
    <Grid
      templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(6, 1fr)"]}
      gap={6}
      h="100vh"
      width="100vw"
    >
      <Flex
        alignItems="center"
        justifyContent="flex-end"
        gridColumn={["span 1", "span 1", "span 3"]}
        mr={8}
      >
        <VStack
          p={8}
          maxWidth="500px"
          width="full"
          spacing={6}
          boxShadow="lg"
          rounded="lg"
          bg={useColorModeValue("white", "gray.800")}
        >
          <Flex justifyContent="flex-end" width="100%">
            <ColorModeSwitcher />
          </Flex>
          <Box textAlign="center">
            <Text fontSize="2xl" fontWeight="bold">
              {welcomeText}
            </Text>
            <ActiveUsers />
            <Text>{detailsText}</Text>
          </Box>
          <Box w="100%">
            {formComponent === "signin" ? (
              <>
                <SignInForm />
                <Flex justifyContent="center">
                  <Text>
                    Don't have an account?{" "}
                    <Link to="/" onClick={() => setFormComponent("signup")}>
                      Sign up
                    </Link>
                  </Text>
                </Flex>
              </>
            ) : (
              <>
                <SignUpForm />
                <Flex justifyContent="center">
                  <Text>
                    Already have an account?{" "}
                    <Link to="/" onClick={() => setFormComponent("signin")}>
                      Sign in
                    </Link>
                  </Text>
                </Flex>
              </>
            )}
          </Box>
        </VStack>
      </Flex>
      <MotionBox
        key={bgImage}
        bgImage={`url(${bgImage})`}
        bgPos="center"
        bgSize="cover"
        gridColumn={["span 1", "span 1", "span 3"]}
        display={["none", "none", "block"]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </Grid>
  );
};

export default LandingPage;
