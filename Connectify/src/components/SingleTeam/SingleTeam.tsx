import { Box, HStack, VStack, Text, Avatar } from "@chakra-ui/react";
import { Team } from '../../api/databaseApi';

interface SingleTeamProps {
  team: Team;
  onTeamClick: (team: Team) => void;
  isSelected: boolean;
}

const SingleTeam: React.FC<SingleTeamProps> = ({ team, onTeamClick, isSelected }) => {
  return (
    <Box
      key={team.uid}
      p={1}
      mb={1}
      backgroundColor={isSelected ? "#f5f6f6" : "transparent"}
      _hover={{
        backgroundColor: "#f5f6f6",
        cursor: "pointer",
      }}
      onClick={() => onTeamClick(team)}
    >
      <HStack spacing={2} align="start">
      <Avatar name={team.name} src={team.photoUrl} />
          <Text>
            {team.name}
          </Text>
      </HStack>
    </Box>
  );
};

export default SingleTeam;
