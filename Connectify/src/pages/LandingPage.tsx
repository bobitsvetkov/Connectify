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
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      gap={6}
      h="100vh"
      width="100vw"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        gridColumn={{ base: "span 1", md: "span 1" }}
        padding={{ base: "8", md: "0" }}
      >
        <Container
          p={{ base: "5%", md: "8" }}
          maxWidth="container.md"
          width="full"
          boxShadow="lg"
          rounded="lg"
          bg={useColorModeValue("white", "gray.800")}
        >
          <Flex justifyContent="flex-end" width="100%">
            <ColorModeSwitcher />
          </Flex>
          <Box textAlign="center">
            <Text fontSize={{ base: "4vw", md: "2xl" }} fontWeight="bold">
              {welcomeText}
            </Text>
            <Text fontSize={{ base: "2vw", md: "md" }}>{detailsText}</Text>
          </Box>
          <Box w="100%">
            {formComponent === "signin" ? (
              <>
                <SignInForm />
                <Flex justifyContent="center">
                  <Text fontSize={{ base: "2vw", md: "md" }}>
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
                  <Text fontSize={{ base: "2vw", md: "md" }}>
                    Already have an account?{" "}
                    <Link to="/" onClick={() => setFormComponent("signin")}>
                      Sign in
                    </Link>
                  </Text>
                </Flex>
              </>
            )}
          </Box>
        </Container>
      </Flex>
      {isLargerThan800 && (
        <MotionBox
          key={bgImage}
          bgImage={`url(${bgImage})`}
          bgPos="center"
          bgSize="cover"
          gridColumn={{ base: "span 1", md: "span 1" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </Grid>
  );
};

export default LandingPage;