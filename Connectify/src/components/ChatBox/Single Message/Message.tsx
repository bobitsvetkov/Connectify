import { useState } from "react";
import { useAddReplyToMessageMutation } from "../../../api/databaseApi";
import { useAddReactionToMessageMutation } from "../../../api/databaseApi";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../../store";
import {
  VStack,
  Avatar,
  Box,
  Flex,
  Text,
  HStack,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import EmojiReactions from "../Reactions/EmojiReaction";
import DeleteMessage from "../Delete/DeleteMessage";
import EditMessage from "../Edit/EditMessage";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useGetUserByIdQuery } from "../../../api/databaseApi";
import { getAuth } from "@firebase/auth";
import { Spacer } from "@chakra-ui/react";
import { AvatarBadge } from "@chakra-ui/react";
import { useAddReactionToTeamMessageMutation } from "../../../api/databaseApi";
import { Message } from "../../../api/databaseApi";
function Message({
  message,
  messageId,
  chatId,
  setReplyTo,
  getStatusColor,
  isChat,
  teamId,
  channelId,
}: {
  message: Message;
  messageId: string;
  chatId: string;
  setReplyTo: (replyTo: Message | null) => void; 
  getStatusColor: (status: string) => string; 
  isChat: boolean;
  teamId: string;
  channelId: string;
}) {
  const [addReplyToMessage] = useAddReplyToMessageMutation();
  const currUser = useSelector((state: RootState) => state.activeUser.user);
  const [addReactionToMessage] = useAddReactionToMessageMutation();
  const [addReactionToTeamMessage] = useAddReactionToTeamMessageMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [replyInputShown, setReplyInputShown] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserByIdQuery(message.user);
  const currUserUid = getAuth().currentUser?.uid;

  console.log('currUserUid:', currUserUid);
  console.log('message.user:', message.user);

  if (!messageId) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    // Check if the message type is audio, gif, or image
    if (message.type === "audio" || message.type === "gif" || message.type === "image") {
      setIsDeleting(true);
    }
  };

  const addReaction = (emoji: string) => {
    if (!currUser) {
      console.log("Current user is not defined");
      return;
    }

    console.log(`Add reaction ${emoji} to message ${messageId}`);

    const reaction = {
      uid: uuidv4(),
      emoji: emoji,
      user: currUser.uid,
    };

    isChat
      ? addReactionToMessage({ chatId, messageId, reaction })
      : addReactionToTeamMessage({ teamId, channelId, messageId, reaction });

    const reply = {
      uid: uuidv4(),
      user: currUser.uid,
      content: `Reply: ${replyContent}`,
      date: new Date().toISOString(),
      reactions: [], 
    };

    console.log("chatId", chatId); 
    console.log("messageId", messageId); 
    console.log("reply", reply); 

    addReplyToMessage({ chatId, messageId, reply });
    setReplyContent("");
    setReplyInputShown(false);
    setReplyTo(null);
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
              bg={getStatusColor(user?.status || '')}
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
          >
            {currUserUid === message.user && ( // Check if current user is the author of the message
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
            {message.date && new Date(message.date).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "numeric",
            })}
          </Text>
        </Box>
      </Flex>
      {message.reactions && (
        <Flex>
          {Object.values(message.reactions).map((reaction) => (
            <span key={reaction.uid} style={{ marginRight: '0.5rem' }}>
              {reaction.emoji}
            </span>
          ))}
        </Flex>
      )}
    </VStack>
  );
}

export default Message;
