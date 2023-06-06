import * as React from 'react';
import { Flex, Box, Heading } from "@chakra-ui/react";
import TeamCarousel from "./TeamCarousel";
import ContactForm from "./ContactForm";
import { useColorModeValue } from "@chakra-ui/react";
export const AppInfo = React.forwardRef<HTMLDivElement>((_, ref) => {
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
        <Heading fontWeight={"bold"} fontSize={"32px"} textAlign={"center"}>
          Connectify Info
        </Heading>
        <Flex direction={{ base: "column", md: "row" }} pb={"5%"} width="100%">
          <Box
            width={{ base: "100%", md: "50%" }}
            padding={{ base: "10px", md: "25px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            mb={{ base: "200px", md: "0" }}
          >
            <TeamCarousel />
          </Box>
          <Box
            width={{ base: "100%", md: "50%" }}
            padding={"25px"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            mb={{ base: "20", md: "10px" }}
            ml={{ md: "10px" }}
          >
            <ContactForm />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
});

export default AppInfo;