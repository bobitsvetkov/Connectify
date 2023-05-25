import React from "react";
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  VStack,
  Grid,
  useMediaQuery,
  Container
} from "@chakra-ui/react";
import ColorModeSwitcher from "../components/Dark Mode Toggle/DarkModeToggle";
import { MotionBox } from "../components/SignIn/SignIn";
import { SignInForm } from "../components/SignIn/SignIn";
import { SignUpForm } from "../components/SignUp/SignUp";
import { LandingPageProps } from "../types/interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";

const LandingPage: React.FC<LandingPageProps> = ({
  welcomeText,
  detailsText,
}) => {
  const bgImage = useColorModeValue(
    "https://images.unsplash.com/photo-1527181152855-fc03fc7949c8",
    "https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831"
  );

  const [formComponent, setFormComponent] = useState("signin");

  return (
    <Grid
      templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(6, 1fr)"]}
      gap={6}
      h="100vh"
      width="100vw">
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