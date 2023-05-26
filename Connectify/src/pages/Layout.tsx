import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { LeftPanel } from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
function Layout() {
  return (
    <Flex h="100vh">
      <LeftPanel />
      <RightPanel />
    </Flex>
  );
}

export default Layout;
