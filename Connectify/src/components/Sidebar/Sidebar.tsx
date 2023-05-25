import React, { useState } from "react";
import { Box, Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import { AddIcon, SearchIcon, InfoIcon } from "@chakra-ui/icons";
import UserList from "../UserList";
import { useColorModeValue } from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";

enum SidebarContent {
  ADD,
  SEARCH,
  INFO,
}

const Sidebar: React.FC = ({ onClose }) => {
  const [activeContent, setActiveContent] = useState<SidebarContent | null>(
    null
  );

  return (
    <Flex
      as="nav"
      aria-label="Main Navigation"
      position="absolute"
      top="74.5px"
      left="0"
      height="80vh"
      direction="row"
      padding="1rem"
      bg="gray.700"
      color="white"
    >
      <Box
        width="60px"
        height="100%"
        display="flex"
        flexDirection="column"
        marginRight="1rem"
      >
        <IconButton
          aria-label="Add Icon"
          icon={<AddIcon />}
          mb="1rem"
          variant="ghost"
          colorScheme="teal"
          onClick={() => setActiveContent(SidebarContent.ADD)}
        />
        <IconButton
          aria-label="Search Icon"
          icon={<SearchIcon />}
          mb="1rem"
          variant="ghost"
          colorScheme="teal"
          onClick={() => setActiveContent(SidebarContent.SEARCH)}
        />
        <IconButton
          aria-label="Info Icon"
          icon={<InfoIcon />}
          variant="ghost"
          colorScheme="teal"
          onClick={() => setActiveContent(SidebarContent.INFO)}
        />
      </Box>
      <Divider orientation="vertical" />
      <Box
        width={activeContent ? "150x" : "100"}
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        overflowX="hidden"
        transition="width 0.3s ease-in-out"
      >
        {activeContent === SidebarContent.ADD && <UserList />}
        {activeContent === SidebarContent.SEARCH && <Text>Search Content</Text>}
        {activeContent === SidebarContent.INFO && <Text>Info Content</Text>}
      </Box>
    </Flex>
  );
};

export default Sidebar;
