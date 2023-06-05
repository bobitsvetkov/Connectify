import React from "react";
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  VStack,
  Button,
  Image,
  IconButton
} from "@chakra-ui/react";
import ColorModeSwitcher from "../Dark Mode Toggle/DarkModeToggle";
import { LandingPageProps } from "../../types/interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";
import ActiveUsers from "../ActiveUsers/ActiveUsers";
import { Features } from "./Features";
import { useRef } from "react";
import LandingHeader from "./LandingHeader";
import AppInfo from "./AppInfo";
import { motion } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";
import Testimonials from "./Testimonials";
import { ArrowUpIcon } from "@chakra-ui/icons";
const LandingPage: React.FC<LandingPageProps> = ({ welcomeText }) => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const appInfoRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();
  const [showScroll, setShowScroll] = useState(false);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAppInfo = () => {
    appInfoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  window.addEventListener('scroll', checkScrollTop);


  const [formComponent, setFormComponent] = useState("signin");

  const MotionBox = motion(Box);

  return (
    <>
      <LandingHeader />
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        color={"black"}
        background={"#black"}
        width={"100%"}
      >
        <Flex align="center" justifyContent="center" mr={8}>
          <VStack
            p={8}
            maxWidth="500px"
            width="full"
            spacing={6}
            rounded="lg"
            bg={useColorModeValue("white", "gray.800")}
            color={useColorModeValue("#f57c73", "#f57c73")}
          >
            <MotionBox
              w="100%"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.04, 0.62, 0.23, 0.98] }}
              color={useColorModeValue("#f57c73", "#f57c73")}
            >
              <Text fontSize="2xl" fontWeight="bold">
                {welcomeText}
              </Text>
              <Text mb={10} fontSize={20} fontStyle="Italic">
                Introducing Connectify, a user-friendly chat messenger that
                makes communication effortless. Stay connected with friends,
                family, and colleagues through chats, video calls, and voice
                messages. Enjoy clear audio quality and express yourself with
                interactive stickers and personalized GIFs. Experience the
                simplicity and power of Connectify and take your connections to
                new heights.
              </Text>
              <Button
                mr={10}
                variant={"ghost"}
                borderRadius={"20px"}
                onClick={scrollToFeatures}
                _hover={{
                  bg: "#f57c73",
                }}
                color={useColorModeValue("gray.600", "white")}
              >
                Scroll to Features
              </Button>
              <Button
                borderRadius={"20px"}
                variant={"ghost"}
                onClick={scrollToAppInfo}
                _hover={{
                  bg: "#f57c73",
                }}
                color={useColorModeValue("gray.600", "white")}
              >
                Scroll to App Info
              </Button>
            </MotionBox>
          </VStack>
          <Box width={"100%"} ml={"2rem"} height={"100%"}>
            <Image
              src={
                colorMode === "light"
                  ? "https://i.ibb.co/PcyJQYG/2696452-removebg-preview.png"
                  : "https://i.ibb.co/y4ZLK9m/2206-w037-n003-433b-p1-433-removebg-preview-1.png"
              }
              width={"100%"}
              height={"400px"}
              objectFit="cover"
            />
          </Box>
        </Flex>
        <Features ref={featuresRef} />
        <AppInfo ref={appInfoRef} />
        <Testimonials />
        <ActiveUsers />
        {showScroll && <IconButton
          position='fixed'
          icon={<ArrowUpIcon />}
          bottom='40px'
          right='30px'
          onClick={scrollToTop}
        >
          Scroll to top
        </IconButton>}
      </Flex>
    </>
  );
};

export default LandingPage;
