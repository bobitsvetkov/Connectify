import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Flex,
  Fade,
  HStack,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../store";
import {
  useGetChatsQuery,
  useAddMessageToChatMutation,
} from "../../api/ChatsApi";
import { getAuth } from "firebase/auth";
import { User, useGetUserByIdQuery } from "../../api/UsersApi";
import { onValue, ref } from "firebase/database";
import { database } from "../../config/firebaseConfig";
import { Avatar } from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";
import Emojis from "./Emojis/Emojis";
import { IconButton } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { FaSmile, FaPaperPlane, FaMicrophone } from "react-icons/fa";
const ChatBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const activeChatUser: User | null = useSelector(
    (state: RootState) => state.activeUser.user
  );
  const [addMessageToChat, { isLoading: isAddingMessage }] =
    useAddMessageToChatMutation();
  const triggerEmojiPicker = () => {
    SetEmojiPicker(!emojiPickerState);
  };
  const { data: chats = {} } = useGetChatsQuery();
  const bg = useColorModeValue("gray.200", "gray.700");
  const [chatData, setChatData] = useState<any | null>(null);

  const auth = getAuth();
  const currUser = auth.currentUser;
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserByIdQuery(currUser && currUser.uid);
  const activeChatId =
    user && activeChatUser
      ? [user.username, activeChatUser.username].sort().join("-")
      : null;

  useEffect(() => {
    if (activeChatId) {
      const chatRef = ref(database, `chats/${activeChatId}`);

      const unsubscribe = onValue(chatRef, (snapshot) => {
        setChatData(snapshot.val());
      });
      return () => unsubscribe();
    }
  }, [activeChatId]);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  if (isUserError || !user) {
    return <div>Error loading user</div>;
  }

  const handleSend = () => {
    if (message.trim().length > 0 && currUser && activeChatUser && user) {
      const userIds = [activeChatUser.username, user.username];
      userIds.sort();
      const chatId = userIds.join("-");

      const newMessage = {
        id: uuidv4(),
        user: currUser.uid,
        content: message,
        date: new Date().toISOString(),
      };

      addMessageToChat({ chatId, message: newMessage });
      setMessage("");
    }
  };

  return (
    <VStack height="100%" width="100%" padding={5} boxShadow="xl" spacing={6}>
      <Box fontSize="xl">
        {activeChatUser
          ? activeChatUser.firstName + " " + activeChatUser.lastName
          : ""}
      </Box>
      <Divider orientation="horizontal" color="black" />
      <Box flexGrow={1} overflowY="auto" width="100%" marginBottom={20}>
        {chatData?.messages &&
          Object.values(chatData.messages)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((message, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent={
                  message.user === user.uid ? "flex-end" : "flex-start"
                }
                marginBottom="1rem"
              >
                {message.user !== user.uid && (
                  <Avatar
                    size="sm"
                    name={activeChatUser?.firstName}
                    src={activeChatUser?.avatar}
                    marginRight="0.5rem"
                  />
                )}
                <Box
                  maxWidth="40%"
                  padding="1rem 1rem"
                  borderRadius="lg"
                  backgroundColor={
                    message.user === user.uid ? "blue.500" : "#a2adbb"
                  }
                  color={message.user === user.uid ? "white" : "black"}
                >
                  {message.content}
                </Box>
              </Box>
            ))}
      </Box>
      <Flex
        width="80%"
        align="center"
        mx="auto"
        mt={4}
        bg={bg}
        rounded="full"
        padding="0.75rem 1rem"
        _focus={{
          outline: "none",
        }}
        border="none"
        position="relative"
      >
        <Emojis
          message={message}
          setMessage={setMessage}
          emojiPickerState={emojiPickerState}
          setEmojiPickerState={SetEmojiPicker}
        />
        <Spacer mx={2} />
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          flexGrow={1}
          bg={bg}
          border={"none"}
        />
        <Spacer mx={2} />
        <IconButton
          onClick={handleSend}
          isLoading={isAddingMessage}
          colorScheme="teal"
          aria-label="Send Message"
          icon={message ? <FaPaperPlane /> : <FaMicrophone />}
        />
      </Flex>
    </VStack>
  );
};

export default ChatBox;
