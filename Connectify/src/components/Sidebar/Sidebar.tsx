import React, { useState } from "react";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { AddIcon, SearchIcon, InfoIcon } from "@chakra-ui/icons";

enum SidebarContent {
  ADD,
  SEARCH,
  INFO,
}

const Sidebar: React.FC = () => {
  const [activeContent, setActiveContent] = useState<SidebarContent | null>(
    null
  );

  return (
    <Flex
      as="nav"
      aria-label="Main Navigation"
      position="fixed"
      top="74.5"
      left="0"
      height="100vh"
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
      <Box
        width="150px"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {activeContent === SidebarContent.ADD && <Text>Add Content</Text>}
        {activeContent === SidebarContent.SEARCH && <Text>Search Content</Text>}
        {activeContent === SidebarContent.INFO && <Text>Info Content</Text>}
      </Box>
    </Flex>
  );
};

export default Sidebar;
