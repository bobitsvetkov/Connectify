import React from "react";
import { Flex, Box, Text, Heading } from "@chakra-ui/react";
import ActiveUsers from "../ActiveUsers/ActiveUsers";
import TeamCarousel from "./TeamCarousel";
import ContactForm from "./ContactForm";
// import ContactForm from "./ContactForm";
import { useColorModeValue } from "@chakra-ui/react";
export const AppInfo = React.forwardRef((props, ref) => {
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      pb={"5%"}
      width={"100%"}
      color={"#f57c73"}
      bg={useColorModeValue("white", "gray.800")}
      ref={ref}
    >
      <Box maxWidth={"1600px"} mt={"50px"} width={"100%"}>
        <Heading fontWeight={"bold"} fontSize={"32px"} align={"center"}>
          Connectify Info
        </Heading>
        <Flex direction={{ base: "column", md: "row" }} pb={"5%"} width="100%">
          <Box
            width={{ base: "100%", md: "50%" }}
            padding={{ base: "10px", md: "25px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            mb={{ base: "5px", md: "10px" }}
          >
            <TeamCarousel />
          </Box>
          <Box
            width={"50%"}
            padding={"25px"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            mb={"10px"}
          >
            <ContactForm />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
});

export default AppInfo;
