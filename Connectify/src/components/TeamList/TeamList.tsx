import { Box } from "@chakra-ui/react";
import { useGetTeamsQuery, Team } from '../../api/databaseApi';

const TeamsList = ({ setTeamListOpen }) => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError || !teams) {
    return <Box>Error loading teams</Box>;
  }

  return (
    <Box>
      <h2>Teams</h2>
      <ul>
        {Object.values(teams).map((team: Team, index: number) => (
          <li
            key={index}
            style={{ cursor: "pointer" }}
          >
            {team.name}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default TeamsList;
