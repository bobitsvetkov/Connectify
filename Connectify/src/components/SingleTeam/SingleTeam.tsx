import { HStack, Text, Avatar, useDisclosure, useColorModeValue, Button } from "@chakra-ui/react";
import { Team } from "../../types/interfaces";
import { Menu, MenuButton, MenuItem, MenuList, IconButton, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { HamburgerIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDeleteTeamMutation } from "../../api/databaseApi";
import { useRef } from 'react';
import { Tooltip } from "@chakra-ui/react";

interface SingleTeamProps {
  team: Team;
  onTeamClick: (team: Team) => void;
  isSelected: boolean;
  userId: string;
}

const SingleTeam: React.FC<SingleTeamProps> = ({ team, onTeamClick, isSelected, userId }) => {
  const hoverBgColor = useColorModeValue('gray.100', 'gray.800');
  const selectedBgColor = useColorModeValue('gray.100', 'gray.800');

  const [deleteTeam, { isLoading: isDeleting }] = useDeleteTeamMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const handleDelete = () => {
    onOpen();
  };

  const confirmDelete = async () => {
    await deleteTeam(team.uid);
    onClose();
  };

  let displayName = team.name;
  if (displayName.length > 15) {
    displayName = `${displayName.slice(0, 16)}...`;
  }

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
      justifyContent="space-between"
    >
      <HStack
        onClick={() => onTeamClick(team)}
      >
        <Avatar name={team.name} src={team.photoUrl} borderRadius="6" />
        <Tooltip label={team.name} isDisabled={team.name.length <= 15}>
          <Text fontWeight={isSelected ? "bold" : "normal"}>{displayName}</Text>
        </Tooltip>
      </HStack>

      {team.owner === userId && (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            size="xs"
            variant="unstyled"
          />
          <MenuList>
            <MenuItem icon={<DeleteIcon />} onClick={handleDelete}>
              Delete Team
            </MenuItem>
          </MenuList>
        </Menu>
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Team
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3} isLoading={isDeleting}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </HStack>
  );
};

export default SingleTeam;
