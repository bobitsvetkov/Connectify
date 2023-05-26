import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { LeftPanel } from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";

function Layout({ children }) {
  return (
    <Flex h="100vh">
      <LeftPanel />
      <RightPanel>
        {children}
      </RightPanel>
    </Flex>
  );
}

export default Layout;
