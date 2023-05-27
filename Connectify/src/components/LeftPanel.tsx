import { Box, Flex } from "@chakra-ui/react";
import { Header } from "./HeaderMenu/HeaderMenu";
import UserList from "./UserList";
import SearchInput from "./Search/SearchInput";
import { useState } from "react";
import { SearchResults } from "./Search/SearchResults";
import LeftList from "./LeftList/LeftList";

export const LeftPanel: React.FC = () => {
  const [view, setView] = useState("default");
  const [isUserListOpen, setUserListOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (data) => {
    setSearchResults(data);
    setIsSearching(!!data);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleChatClick = () => {
    setUserListOpen(true);
  };

  return (
    <Flex direction="column" w={["100%", "100%", "30%"]}>
      <Box>
        <Header
          onViewChange={handleViewChange}
          onChatClick={handleChatClick}
          setUserListOpen={setUserListOpen}
        />
        <SearchInput size="sm" onSearch={handleSearch} />
      </Box>
      {isSearching ? (
        <LeftList results={searchResults} searchQuery={searchQuery} />
      ) : (
        view === "chat" &&
        isUserListOpen && <UserList setUserListOpen={setUserListOpen} />
      )}
    </Flex>
  );
};
