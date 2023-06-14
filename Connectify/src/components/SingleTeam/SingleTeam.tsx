import { Box, HStack, Text, Avatar } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { Team } from "../../types/interfaces";

interface SingleTeamProps {
  team: Team;
  onTeamClick: (team: Team) => void;
  isSelected: boolean;
}

const SingleTeam: React.FC<SingleTeamProps> = ({ team, onTeamClick, isSelected }) => {
  const hoverBgColor = useColorModeValue('gray.100', 'gray.800');
  const selectedBgColor = useColorModeValue('gray.100', 'gray.800');
  return (
    <Box
      key={team.uid}
      p={1}
      mb={1}
      backgroundColor={isSelected ? selectedBgColor : "transparent"}
      _hover={{
        backgroundColor: hoverBgColor,
        cursor: "pointer",
      }}
      onClick={() => onTeamClick(team)}
    >
      <HStack spacing={2} align="start">
        <Avatar name={team.name} src={team.photoUrl} borderRadius="6" />
        <Text>
          {team.name}
        </Text>
      </HStack>
    </Box>
  );
};

export default SingleTeam;
