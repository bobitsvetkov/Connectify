import React from "react";
import { Tag, TagLabel, TagCloseButton, VStack, Text } from "@chakra-ui/react";
import { EventUserDisplayProps } from "../../types/interfaces";
export const EventUserDisplay: React.FC<EventUserDisplayProps> = ({
  selectedUsers,
  handleRemoveUser,
}) => {
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
