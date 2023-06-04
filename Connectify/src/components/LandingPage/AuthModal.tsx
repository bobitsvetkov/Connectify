import {
  Box,
  Text,
  Link,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import { SignInForm } from "../SignIn/SignIn";
import { SignUpForm } from "../SignUp/SignUp";

const AuthModal = ({
  isOpen,
  onClose,
  formComponent,
  setFormComponent,
  welcomeText,
  detailsText,
}) => {
  const modalHeader = formComponent === "signin" ? "Sign In" : "Sign Up";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay zIndex={"3"} />
      <ModalContent borderRadius={"20px"}>
        <ModalHeader align="center">{modalHeader}</ModalHeader>
        <VStack p={8} width="full" spacing={6} boxShadow="lg" rounded="lg">
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
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setFormComponent("signup");
                      }}
                    >
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
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setFormComponent("signin");
                      }}
                    >
                      Sign in
                    </Link>
                  </Text>
                </Flex>
              </>
            )}
          </Box>
        </VStack>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
