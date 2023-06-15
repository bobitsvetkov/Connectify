import { Flex } from "@chakra-ui/react";
import { LeftPanel } from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import { LayoutProps } from "../types/interfaces";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex h="100vh" overflowY={"auto"}>
      <LeftPanel />
      <RightPanel>{children}</RightPanel>
    </Flex>
  );
};

export default Layout;
