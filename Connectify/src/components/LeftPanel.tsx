import { Box, Flex } from "@chakra-ui/react";
import { Header } from "./HeaderMenu/HeaderMenu";
import UserList from "./UserList";
import SearchInput from "./Search/SearchInput";
import { useState } from "react";

export function LeftPanel(props) {
  const [view, setView] = useState("default");
  const [isUserListOpen, setUserListOpen] = useState(true);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleChatClick = () => {
    setUserListOpen(true);
  };

  return (
    <Flex direction="column" w={["100%", "100%", "30%"]} {...props}>
      <Box>
        <Header
          onViewChange={handleViewChange}
          onChatClick={handleChatClick}
          setUserListOpen={setUserListOpen}
        />
        <SearchInput />
      </Box>
      {view === "chat" && isUserListOpen && (
        <UserList flex="1" overflow="auto" setUserListOpen={setUserListOpen} />
      )}
    </Flex>
  );
}
