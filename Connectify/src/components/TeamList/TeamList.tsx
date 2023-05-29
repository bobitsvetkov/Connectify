import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useGetTeamsQuery, useGetUserByIdQuery, Team } from '../../api/databaseApi';
import { getAuth } from "firebase/auth";
import SingleTeam from "../SingleTeam/SingleTeam";
import CreateTeamModal from "../CreateTeamModal/CreateTeamModal";

const TeamsList = ({ setTeamListOpen, setSelectedTeam, selectedTeam }) => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const currUser = getAuth().currentUser;
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useGetUserByIdQuery(currUser && currUser.uid);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError || !teams) {
    return <Box>Error loading teams</Box>;
  }

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team)
  }
  
  return (
    <Box>
      {teams && Object.values(teams).map((team: Team) => {
        const isInTeam = Object.values(team.participants).includes(user.username);
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

