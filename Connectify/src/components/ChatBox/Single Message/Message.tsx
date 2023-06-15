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
  Spacer,
  HStack
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
  chatId: string | undefined;
  getStatusColor: (status: string) => string;
  isChat: boolean;
  teamId: string | undefined;
  channelId: string | undefined;
}) {
  const currUser = useSelector((state: RootState) => state.activeUser.user);
  const [addReactionToMessage] = useAddReactionToMessageMutation();
  const [addReactionToTeamMessage] = useAddReactionToTeamMessageMutation();
  const [reactionCount, setReactionCount] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: user } = useGetUserByIdQuery(message.user);
  const currUserUid = getAuth().currentUser?.uid;
  const bgColor = useColorModeValue("gray.300", "gray.700");

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
    if (!currUser?.uid) {
      console.log("Current user or user's ID is not defined");
      return;
    }
    const reaction = {
      uid: currUser?.uid,
      emoji: emoji,
      user: currUser?.uid,
    };

    if (isChat) {
      if (!currUser) {
        console.log("Current user is not defined");
        return;
      }
      if (!chatId) {
        console.log("Chat ID is not defined");
        return;
      }
      console.log(`Add reaction ${emoji} to message ${messageId}`);
      await addReactionToMessage({ chatId, messageId, reaction });
    } else {
      if (!teamId) {
        console.log("Team ID is not defined");
        return;
      }
      if (!channelId) {
        console.log("Channel ID is not defined");
        return;
      }
      await addReactionToTeamMessage({
        teamId,
        channelId,
        messageId,
        reaction,
      });
    }
  };

  return (
    <VStack align="flex-start" spacing={2}>
      <Flex align="center" direction={message.user === currUserUid ? "row-reverse" : "row"}>
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

        <Flex direction="column" w="100%">
          <Flex
            direction={message.user === currUserUid ? "row-reverse" : "row"}
            align="flex-start"
            width="100%"
          >
            <HStack>
              {currUserUid === message.user && (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<HamburgerIcon />}
                    variant="unstyled"
                    size="xs"
                    ml={2}
                  />
                  <MenuList>
                    <MenuItem onClick={() => setIsDeleting(true)}>Delete Message</MenuItem>
                    <MenuItem onClick={() => setIsEditing(true)}>Edit Message</MenuItem>
                  </MenuList>
                </Menu>
              )}

              <EmojiReactions messageId={messageId} addReaction={addReaction} />
            </HStack>
          </Flex>
          {currUserUid !== message.user ? (
            <HStack spacing={4} alignItems="center">
            <Box
              maxWidth={"lg"}
              minWidth={"20%"}
              w={"fit-content"}
              boxShadow={"2xl"}
              rounded={"3xl"}
              p={3}
              textAlign="left"
              bg={message.user === (currUser?.uid || "") ? "#4960d9" : "gray.200"}
              color="black"
              wordBreak="break-word"
            >
              <Text>{message.content}</Text>
            </Box>
            <Text fontSize="sm">
              {message.date &&
                new Date(message.date).toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "numeric",
                })}
            </Text>
          </HStack>
          ) : (
            <HStack spacing={4} alignItems="center">
            <Text fontSize="sm">
              {message.date &&
                new Date(message.date).toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "numeric",
                })}
            </Text>
            <Box
              maxWidth={"lg"}
              minWidth={"20%"}
              w={"fit-content"}
              boxShadow={"2xl"}
              rounded={"3xl"}
              p={3}
              textAlign="left"
              bg={message.user === (currUser?.uid || "") ? "#4960d9" : "gray.200"}
              color="black"
              wordBreak="break-word"
            >
              <Text>{message.content}</Text>
            </Box>
          </HStack>
          ) }
        </Flex>
      </Flex>

      {message.reactions && (
        <>
          <Box
            alignContent={"center"}
            position="relative"
            alignSelf={message.user === currUserUid ? "flex-end" : "flex-start"}
            // zIndex={1}
          >
            <Flex border={"1px"} borderRadius={"20px"} bg={bgColor} p={0.5}>
              {Object.values(message.reactions).map((reaction) => (
                <span key={reaction.uid} style={{ marginRight: "0.5rem" }}>
                  {reaction.emoji}
                </span>
              ))}
              <Text fontSize={"13"}>{`${reactionCount}`}</Text>
            </Flex>
          </Box>
        </>
      )}

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
    </VStack>
  );
}

export default SingleMessage;
