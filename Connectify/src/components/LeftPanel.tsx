import { Box, Flex, VStack } from "@chakra-ui/react";
import { Header } from "./HeaderMenu/HeaderMenu";
import UserList from "./UserList";
import SearchInput from "./Search/SearchInput";
import { useState } from "react";
import { SearchResults } from "./Search/SearchResults";
import LeftList from "./LeftList/LeftList";
import TeamsList from "./TeamList/TeamList";
import ChannelList from "./ChannelList/ChannelList";

export const LeftPanel: React.FC = () => {
  const [view, setView] = useState("default");
  const [isUserListOpen, setUserListOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isTeamListOpen, setTeamListOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleSearch = (data) => {
    setSearchResults(data);
    setIsSearching(!!data);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleChatClick = () => {
    setUserListOpen(true);
    setTeamListOpen(false);
    setSelectedTeam(null);
  };

  const handleTeamsClick = () => {
    setTeamListOpen(true);
    setUserListOpen(false);
    setSelectedTeam(null);
  };

  return (
    <Flex direction="column" w={["100%", "100%", "30%"]}>
      <Box>
        <Header
          onViewChange={handleViewChange}
          onChatClick={handleChatClick}
          onTeamsClick={handleTeamsClick}
          setUserListOpen={setUserListOpen}
          setTeamListOpen={setTeamListOpen} 
        />
        <SearchInput size="sm" onSearch={handleSearch} />
      </Box>
      {isSearching ? (
        <SearchResults results={searchResults} searchQuery={searchQuery} />
      ) : (
        <Flex direction="row">
          {view === "chat" && isUserListOpen && <UserList setUserListOpen={setUserListOpen} />}
          {view === "teams" && isTeamListOpen && 
            <Flex direction="row" w="100%">
              <TeamsList setTeamListOpen={setTeamListOpen} setSelectedTeam={setSelectedTeam} selectedTeam={selectedTeam}/>
              {selectedTeam && <ChannelList team={selectedTeam}/>}
            </Flex>
          }
        </Flex>
      )}
    </Flex>
  );
};

export default LeftPanel;
