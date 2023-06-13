import { Box, Flex, Stack } from "@chakra-ui/react";
import { Header } from "./HeaderMenu/HeaderMenu";
import SearchInput from "./Search/SearchInput";
import { useState } from "react";
import { SearchResults } from "./Search/SearchResults";
import TeamsList from "./TeamList/TeamList";
import ChannelList from "./ChannelList/ChannelList";
import LatestChatsList from "./LatestChatsList/LatestChatsList";
import { useColorModeValue } from "@chakra-ui/react";
import { User } from "../api/databaseApi";

export const LeftPanel: React.FC = () => {
  const [view, setView] = useState("default");
  const [isUserListOpen, setUserListOpen] = useState(true);
  const [searchResults, setSearchResults] = useState<User[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isTeamListOpen, setTeamListOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleSearch = (data: User[]) => {
    setSearchResults(data);
    setIsSearching(!!data);
  };

  const handleViewChange = (newView: "default" | "chat" | "teams") => {
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
        <SearchInput size="sm" onSearch={handleSearch} bg={""} />
      </Box>
      {isSearching ? (
        <SearchResults
          results={searchResults ? searchResults : []}
          searchQuery={""}
        />
      ) : (
        <Stack overflowY="auto" bg={useColorModeValue("#EDF3F5", "	#3C4256")}>
          {view === "chat" && isUserListOpen && (
            <LatestChatsList setUserListOpen={setUserListOpen} />
          )}
          {view === "teams" && isTeamListOpen && (
            <Flex
              direction="row"
              w="100%"
              bg={useColorModeValue("#EDF3F5", "	#3C4256")}
            >
              <TeamsList
                setTeamListOpen={setTeamListOpen}
                setSelectedTeam={setSelectedTeam}
                selectedTeam={selectedTeam}
              />
              {selectedTeam && <ChannelList team={selectedTeam} />}
            </Flex>
          )}
        </Stack>
      )}
    </Flex>
  );
};

export default LeftPanel;
