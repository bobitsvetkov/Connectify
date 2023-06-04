import React, { useEffect, useState } from "react";
import { database } from "../../config/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { Box } from "@chakra-ui/layout";
import {
  Image,
  Text,
  Container,
  Flex,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useRef } from "react";
import AuthModal from "../LandingPage/AuthModal";

const ActiveUsers = ({ welcomeText, detailsText }) => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [formComponent, setFormComponent] = useState("signin");
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    const usersRef = ref(database, "users");

    onValue(usersRef, (snapshot) => {
      const count = snapshot.size;
      setUserCount(count);
    });
  }, []);

  const handleSignUpClick = () => {
    setIsSignUpOpen(true);
    setFormComponent("signup");
  };

  const handleCloseSignUp = () => {
    setIsSignUpOpen(false);
  };
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      pb={"5%"}
      width={"100%"}
      color={"#616161"}
      bgGradient="linear-gradient(120deg, #de6262, #ffb88c)"
    >
      <Container width={"full"} maxW={"container.xl"}>
        <Flex
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={8}
          mb={16}
        >
          <Box
            width={{ base: "100%", md: "50%" }}
            pr={{ base: 0, md: 10 }}
            mb={{ base: 10, md: 0 }}
          >
            <Image
              boxSize="100%"
              objectFit="cover"
              mb={4}
              src="https://img.freepik.com/free-vector/human-resources-managers-doing-professional-staff-research-with-magnifier-human-resources-hr-team-work-headhunter-service-concept-illustration_335657-2061.jpg?w=996&t=st=1685878495~exp=1685879095~hmac=044ced870eb2dedda20ee1a19ebf975d5664a925f630ba3b232264a5b011bdbf"
            />
          </Box>
          <Flex
            width={{ base: "100%", md: "50%" }}
            alignContent={"center"}
            justifyContent={{ base: "center", md: "flex-end" }}
            flexDirection={"column"}
          >
            <Box
              backgroundColor="grey.700"
              color="grey.700"
              p={8}
              borderRadius="xl"
              boxShadow="xl"
              textAlign="center"
            >
              <Text fontSize={{ base: 24, md: 32 }} fontWeight="bold" mb={4}>
                Join the Chatting Revolution!
              </Text>
              <Text fontSize={{ base: 16, md: 20 }} mb={6}>
                Be part of our dynamic community where {userCount} users are
                already engaged in lively conversations with their friends and
                colleagues.
              </Text>
              <Button
                variant={"ghost"}
                size="lg"
                fontWeight="bold"
                px={8}
                py={4}
                _hover={{ bg: "#616161" }}
                color={"white"}
                onClick={handleSignUpClick}
              >
                Start Chatting Today!
              </Button>
              <AuthModal
                isOpen={isSignUpOpen}
                onClose={handleCloseSignUp}
                formComponent={formComponent}
                setFormComponent={setFormComponent}
                welcomeText={welcomeText}
                detailsText={detailsText}
              />
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default ActiveUsers;
