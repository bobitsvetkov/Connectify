import { useState, useEffect } from "react";
import { useAddReactionToMessageMutation } from "../../../api/databaseApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  VStack,
  Avatar,
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import EmojiReactions from "../Reactions/EmojiReaction";
import DeleteMessage from "../Delete/DeleteMessage";
import EditMessage from "../Edit/EditMessage";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useGetUserByIdQuery } from "../../../api/databaseApi";
import { getAuth } from "@firebase/auth";
import { AvatarBadge } from "@chakra-ui/react";
import { useAddReactionToTeamMessageMutation } from "../../../api/databaseApi";
import { Message } from "../../../api/databaseApi";
function SingleMessage({
  message,
  messageId,
  chatId,
  getStatusColor,
  isChat,
  teamId,
  channelId,
}: {
  message: Message;
  messageId: string;
  chatId: string;
  getStatusColor: (status: string) => string;
  isChat: boolean;
  teamId: string;
  channelId: string;
}) {
  const currUser = useSelector((state: RootState) => state.activeUser.user);
  const [addReactionToMessage] = useAddReactionToMessageMutation();
  const [addReactionToTeamMessage] = useAddReactionToTeamMessageMutation();
  const [reactionCount, setReactionCount] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: user } = useGetUserByIdQuery(message.user);
  const currUserUid = getAuth().currentUser?.uid;

  useEffect(() => {
    if (message.reactions) {
      const count = Object.keys(message.reactions).length;
      setReactionCount(count);
    }
  }, [message.reactions]);

  if (!messageId) {
    return <div>Loading...</div>;
  }

  const addReaction = async (messageId: string, emoji: string) => {
    if (!currUser) {
      console.log("Current user is not defined");
      return;
    }

    console.log(`Add reaction ${emoji} to message ${messageId}`);

    const reaction = {
      uid: currUser.uid,
      emoji: emoji,
      user: currUser.uid,
    };

    isChat
      ? await addReactionToMessage({ chatId, messageId, reaction })
      : await addReactionToTeamMessage({
          teamId,
          channelId,
          messageId,
          reaction,
        });
  };

  return (
    <VStack align="flex-start" spacing={4}>
      <Flex align="center">
        {message.user !== currUserUid && (
          <Avatar
            size="sm"
            name={`${user?.firstName} ${user?.lastName}`}
            src={user?.photoURL}
            marginRight="0.5rem"
          >
            <AvatarBadge
              boxSize="1.25em"
              bg={getStatusColor(user?.status || "")}
              border="2px"
              borderColor="white"
            />
          </Avatar>
        )}

        <Box
          maxW={"lg"}
          w={"full"}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign="left"
          bg={message.user === (currUser?.uid || "") ? "teal.200" : "gray.200"}
          color="black"
          position="relative"
        >
          <Flex
            direction="row"
            justify="flex-end"
            position="absolute"
            top={2}
            right={2}
            zIndex={2}
          >
            {currUserUid === message.user && (
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant="unstyled"
                  size="xs"
                />
                <MenuList>
                  <MenuItem onClick={() => setIsDeleting(true)}>
                    Delete Message
                  </MenuItem>
                  <MenuItem onClick={() => setIsEditing(true)}>
                    Edit Message
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
          <Flex
            direction="row"
            justify="flex-end"
            position="absolute"
            bottom={2}
            right={2}
          >
            <EmojiReactions messageId={messageId} addReaction={addReaction} />
          </Flex>
          <DeleteMessage
            chatId={chatId}
            messageId={messageId}
            isDeleting={isDeleting}
            setIsDeleting={setIsDeleting}
            message={message}
          />
          <EditMessage
            chatId={chatId}
            messageId={messageId}
            initialMessageContent={message.content}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
          <Text>{message.content}</Text>
          <Text fontSize="sm" mt={2}>
            {message.date &&
              new Date(message.date).toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
              })}
          </Text>
        </Box>
      </Flex>
      {message.reactions && (
        <Box
          alignContent={"center"}
          position="relative"
          alignSelf="flex-start"
          mt="-1.5rem"
          zIndex={1}
        >
          <Flex
            border={"1px"}
            borderRadius={"20px"}
            bg={useColorModeValue("gray.300", "gray.700")}
            p={0.5}
          >
            {Object.values(message.reactions).map((reaction) => (
              <span key={reaction.uid} style={{ marginRight: "0.5rem" }}>
                {reaction.emoji}
              </span>
            ))}
            <Text fontSize={"13"}>{`${reactionCount}`}</Text>
          </Flex>
        </Box>
      )}
    </VStack>
  );
}

export default SingleMessage;
