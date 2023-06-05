import React from "react";
import {
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { User } from "../../types/interfaces";
import { useCurrentUser } from "../../AuthUtils";

interface EventUserDisplayProps {
  selectedUsers: User[];
  handleRemoveUser: (uid: string) => void;
}

export const EventUserDisplay: React.FC<EventUserDisplayProps> = ({
  selectedUsers,
  handleRemoveUser,
}) => {
  const { user, isUserLoading, isUserError } = useCurrentUser();

  return (
    <VStack spacing={2}>
      <Text mt={5}>Paricipants:</Text>
      {selectedUsers.map((user) => (
        <Tag
          size="md"
          key={user.uid}
          variant="solid"
          colorScheme="blue"
          borderRadius="full"
        >
          <TagLabel>
            {user.firstName} {user.lastName} [{user.email}]
          </TagLabel>
          <TagCloseButton onClick={() => handleRemoveUser(user.uid)} />
        </Tag>
      ))}
    </VStack>
  );
};

export default EventUserDisplay;
