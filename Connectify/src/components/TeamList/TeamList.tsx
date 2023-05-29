import { Box } from "@chakra-ui/react";
import { useGetTeamsQuery, useGetUserByIdQuery, Team } from '../../api/databaseApi';
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

const TeamsList = ({ setTeamListOpen }) => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const currUser = getAuth().currentUser;
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useGetUserByIdQuery(currUser && currUser.uid);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError || !teams) {
    return <Box>Error loading teams</Box>;
  }


  return (
    <Box>
      <h2>Teams:</h2>
      {teams && Object.values(teams).map(team => {
        const isInTeam = Object.values(team.participants).includes(user.username);
        return (
          isInTeam && <li
            key={uuidv4()}
            style={{ cursor: "pointer" }}
          >
            {team.name}
          </li>
        );
      })}
    </Box>
  );
};

export default TeamsList;
