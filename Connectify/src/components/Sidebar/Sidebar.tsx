import React, { useState } from "react";
import { Avatar, Box, Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import { AddIcon, SearchIcon, InfoIcon } from "@chakra-ui/icons";
import UserList from "../UserList";
import CreateTeamModal from "../CreateTeamModal/CreateTeamModal";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useGetTeamsQuery } from "../../api/TeamsApi";

enum SidebarContent {
  ADD,
  SEARCH,
  INFO,
}

const Sidebar: React.FC = () => {
  const [activeContent, setActiveContent] = useState<SidebarContent | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const { data: teams = {} } = useGetTeamsQuery();

  const handleAddClick = () => {
    setActiveContent(SidebarContent.ADD);
    onOpen();
  };

  const handleSearchClick = () => {
    setActiveContent(SidebarContent.SEARCH);
    navigate("/chat");
  };

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
          onClick={handleAddClick}
        />
        <IconButton
          aria-label="Search Icon"
          icon={<SearchIcon />}
          mb="1rem"
          variant="ghost"
          colorScheme="teal"
          onClick={handleSearchClick}
        />
        <IconButton
          aria-label="Info Icon"
          icon={<InfoIcon />}
          variant="ghost"
          colorScheme="teal"
          onClick={() => setActiveContent(SidebarContent.INFO)}
        />
        <Box overflowY='auto' >
          {teams && Object.values(teams).map(team => {
            return (
              <Avatar
                mt={'5px'}
                ml={'5px'}
                key={team.id}
                name={team.name}
                src={team.photoUrl}
              />
            );
          })}
        </Box>

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
        {activeContent === SidebarContent.ADD && (
          <CreateTeamModal isOpen={isOpen} onClose={onClose} />
        )}
        {activeContent === SidebarContent.SEARCH && <UserList />}
        {activeContent === SidebarContent.INFO && <Text>Info Content</Text>}
      </Box>
    </Flex>
  );
};

export default Sidebar;
