import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Header from "../components/HeaderMenu/HeaderMenu";
import Sidebar from "../components/Sidebar/Sidebar";
import ChatBox from "../components/ChatBox/ChatBox";
import FooterDetails from "../components/Footer";

function Layout({ children }) {
  return (
    <Flex direction="column" height="100vh">
      <Header />
      <Flex direction="row" flexGrow="1">
        <Sidebar flex="0 0 auto" />
        <Box
          bg="grey"
          flex="1"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </Box>
      </Flex>
      <FooterDetails />
    </Flex>
  );
}

export default Layout;
