import { useEffect, useState } from "react";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useGetUserByIdQuery, Team } from '../../api/databaseApi';
import { getAuth } from "firebase/auth";
import SingleTeam from "../SingleTeam/SingleTeam";
import CreateTeamModal from "../CreateTeamModal/CreateTeamModal";
import { ref, onValue, off } from "firebase/database";
import { database } from '../../config/firebaseConfig';

const TeamsList = ({ setTeamListOpen, setSelectedTeam, selectedTeam }) => {
  const currUser = getAuth().currentUser;
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useGetUserByIdQuery(currUser && currUser.uid);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teamsData, setTeamsData] = useState({});

  useEffect(() => {
    const teamsRef = ref(database, `teams/`);
    const handleValueChange = (snapshot) => {
      setTeamsData(snapshot.val());
    };
    onValue(teamsRef, handleValueChange);
    return () => {
      off(teamsRef, handleValueChange);
    };
  }, []);

  if (isUserLoading) {
    return <Box>Loading...</Box>;
  }

  if (isUserError) {
    return <Box>Error loading teams</Box>;
  }

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team)
  }

  return (
    <Box>
      {(teamsData && Object.values(teamsData).length) && Object.values(teamsData).map((team: Team) => {
        const isInTeam = user.uid in team.participants;
        return (
          isInTeam &&
          <SingleTeam
            key={team.uid}
            team={team}
            onTeamClick={handleTeamClick}
            isSelected={selectedTeam === team}
          />
        );
      })}
      <Button onClick={onOpen}>Add Team</Button>
      <CreateTeamModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default TeamsList;
