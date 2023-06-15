import { useEffect, useState } from "react";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useGetUserByIdQuery } from "../../api/databaseApi";
import { getAuth } from "firebase/auth";
import SingleTeam from "../SingleTeam/SingleTeam";
import CreateTeamModal from "../CreateTeamModal/CreateTeamModal";
import { ref, onValue } from "firebase/database";
import { database } from "../../config/firebaseConfig";
import { DataSnapshot } from "firebase/database";
import { Team } from "../../types/interfaces";

type Props = {
  setSelectedTeam: (team: Team) => void;
  selectedTeam: Team | null;
};

const TeamsList = ({ setSelectedTeam, selectedTeam }: Props) => {
  const currUser = getAuth().currentUser;
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserByIdQuery(currUser?.uid || "");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teamsData, setTeamsData] = useState<Team[]>([]);

  useEffect(() => {
    const teamsRef = ref(database, "teams/");

    const handleValueChange = (snapshot: DataSnapshot) => {
      setTeamsData(snapshot.val());
    };

    const unsubscribe = onValue(teamsRef, handleValueChange);

    return () => {
      unsubscribe();
    };
  }, []);

  if (isUserLoading) {
    return <Box>Loading...</Box>;
  }

  if (isUserError) {
    return <Box>Error loading teams</Box>;
  }

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team);
  };

  return (
    <Box
      bg="white"
      h="82.5vh"
      p={4}
      shadow="md"
      borderRight="1px"
      borderColor="gray.200"
    >
      <Box overflowY="auto">
        {user &&
          teamsData &&
          Object.values(teamsData).length &&
          Object.values(teamsData).map((team: Team) => {
            const isInTeam = user.uid in team.participants;
            return (
              isInTeam &&
              user && (
                <SingleTeam
                  key={team.uid}
                  team={team}
                  onTeamClick={handleTeamClick}
                  isSelected={selectedTeam === team}
                />
              )
            );
          })}
      </Box>
      <Button size="lg" colorScheme="teal" onClick={onOpen} mt={3}>+</Button>
      <CreateTeamModal isOpen={isOpen} onClose={onClose} />
    </Box>

  );
};

export default TeamsList;
