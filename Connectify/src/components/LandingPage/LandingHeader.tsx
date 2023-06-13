import { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";

import AuthModal from "./AuthModal";
import ColorModeSwitcher from "../Dark Mode Toggle/DarkModeToggle";
import { LandingHeaderProps } from "../../types/interfaces";

const LandingHeader: React.FC<LandingHeaderProps> = ({ welcomeText }) => {
  const { isOpen } = useDisclosure();
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
    <Box overflow="hidden">
      <Flex
        bg={useColorModeValue("#f57c73", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        position="sticky"
        top="0"
        zIndex={1}
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
          <Image
            src="https://i.ibb.co/kDhJgCz/Logo-Connectify.png"
            maxWidth={"200px"}
            alignContent={useBreakpointValue({ base: "center", md: "left" })}
          ></Image>

          <Flex display={{ base: "none", md: "flex" }} ml={10}></Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={["center", "center", "flex-end", "flex-end"]}
          direction={"row"}
          spacing={6}
        >
          <Flex alignItems="center">
            <Button
              as={"a"}
              fontSize={["sm", "md", "lg", "xl"]}
              p={[2, 4, 6, 6]}
              fontWeight={600}
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
            />

            <Button
              as={"a"}
              fontSize={["sm", "md", "lg", "xl"]} // responsive font size
              p={[2, 4, 6, 6]} // responsive padding
              fontWeight={600}
              color={useColorModeValue("white", "#f57c73")}
              href={"#"}
              onClick={handleSignUpClick}
              _hover={{
                bg: "gray.700",
              }}
              variant={"ghost"}
            >
              Sign Up
            </Button>
            {/* <Flex justifyContent="flex-end" width="100%"> */}
            <ColorModeSwitcher />
            {/* </Flex> */}
            <AuthModal
              isOpen={isSignUpOpen}
              onClose={handleCloseSignUp}
              formComponent={formComponent}
              setFormComponent={setFormComponent}
              welcomeText={welcomeText}
            />
          </Flex>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity></Collapse>
    </Box>
  );
};
export default LandingHeader;
