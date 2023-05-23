import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, VStack, Input, Button, Text, useBreakpointValue, useColorModeValue, Flex, Fade, HStack } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';
import { RootState } from "../../store";
import { useGetChatsQuery, useAddMessageToChatMutation } from "../../api/ChatsApi";
import { getAuth } from "firebase/auth";
import { User, useGetUserByIdQuery } from '../../api/UsersApi';
import { onValue, ref } from 'firebase/database';
import { database } from "../../config/firebaseConfig";

const ChatBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const activeChatUser: User | null = useSelector((state: RootState) => state.activeUser.user);
  const [addMessageToChat, { isLoading: isAddingMessage }] = useAddMessageToChatMutation();
  const { data: chats = {} } = useGetChatsQuery();
  const boxSize = useBreakpointValue({ base: "80%", md: "60%", lg: "40%" });
  const bg = useColorModeValue("gray.200", "gray.700");
  const [chatData, setChatData] = useState<any | null>(null);

  const auth = getAuth();
  const currUser = auth.currentUser;
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useGetUserByIdQuery(currUser && currUser.uid);
  const activeChatId = user && activeChatUser ? [user.username, activeChatUser.username].sort().join('-') : null;

  useEffect(() => {
    if (activeChatId) {
      const chatRef = ref(database, `chats/${activeChatId}`);

      const unsubscribe = onValue(chatRef, snapshot => {
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
      const chatId = userIds.join('-');

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
    <VStack height="80vh" width={boxSize} borderWidth={1} borderRadius="lg" padding={5} bg={bg} boxShadow="xl" ml='30px' mt='30px'>
      <Box fontSize="xl">{activeChatUser ? activeChatUser.firstName + ' ' + activeChatUser.lastName : ''}</Box>
      <Flex direction="column" flexGrow={1} overflowY="auto" width="100%">
        {chatData?.messages && Object.values(chatData.messages).sort((a, b) => new Date(a.date) - new Date(b.date)).map((message, index) => (
          <Fade in key={index}>
            <Text ml={message.user === user.uid ? "auto" : "0"} mr={message.user === user.uid ? "0" : "auto"}>
              <b>{message.user === user.uid ? 'You' : activeChatUser?.firstName}:</b> {message.content}
            </Text>
          </Fade>
        ))}
      </Flex>
      <HStack width="100%" spacing={3}>
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          flexGrow={1}
        />
        <Button onClick={handleSend} isLoading={isAddingMessage} colorScheme="teal">
          Send
        </Button>
      </HStack>
    </VStack>
  );
};

export default ChatBox;