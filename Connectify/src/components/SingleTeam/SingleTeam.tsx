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
    <HStack
      key={team.uid}
      paddingY={1}
      spacing={3}
      backgroundColor={isSelected ? selectedBgColor : "transparent"}
      _hover={{
        backgroundColor: hoverBgColor,
        cursor: "pointer",
      }}
      onClick={() => onTeamClick(team)}
    >
      <Avatar name={team.name} src={team.photoUrl} borderRadius="6" />
      <Text fontWeight={isSelected ? "bold" : "normal"}>{team.name}</Text>
    </HStack>
  );
};

export default SingleTeam;
