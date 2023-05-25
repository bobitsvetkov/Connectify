import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Header from "../components/HeaderMenu/HeaderMenu";
import Sidebar from "../components/Sidebar/Sidebar";
import ChatBox from "../components/ChatBox/ChatBox";
import { Divider } from "@chakra-ui/react";
import FooterDetails from "../components/Footer";

function Layout({ children }) {
  return (
    <Flex direction="column" height="100vh" overflow="hidden">
      <Header />
      <Flex direction="row" flex="1" overflow="hidden">
        <Sidebar pr={4} />
        <Divider orientation="vertical" />
        <Box flex="1" overflow="hidden">
          {children}
        </Box>
      </Flex>
      <FooterDetails />
    </Flex>
  );
}

export default Layout;
