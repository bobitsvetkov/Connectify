import { Box } from "@chakra-ui/react";
import { useGetTeamsQuery, useGetUserByIdQuery, Team } from '../../api/databaseApi';
import { getAuth } from "firebase/auth";
import SingleTeam from "../SingleTeam/SingleTeam";

const TeamsList = ({ setTeamListOpen, setSelectedTeam, selectedTeam }) => {
  // const [selectedTeam, setSelectedTeam] = useState(null);
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const currUser = getAuth().currentUser;
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useGetUserByIdQuery(currUser && currUser.uid);

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
      <h2>Teams:</h2>
      {teams && Object.values(teams).map((team: Team) => {
        const isInTeam = Object.values(team.participants).includes(user.username);
        return (
          isInTeam &&
          <SingleTeam
            key={team.id}
            team={team}
            onTeamClick={handleTeamClick}
            isSelected={selectedTeam === team}
          />
        );
      })}
    </Box>
  );
};

export default TeamsList;
