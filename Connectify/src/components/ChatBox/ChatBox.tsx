import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, VStack, Input, Button, Text } from "@chakra-ui/react";
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

  const auth = getAuth();
  const currUser = auth.currentUser;
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useGetUserByIdQuery(currUser && currUser.uid);
  const activeChatId = user && activeChatUser ? [user.username, activeChatUser.username].sort().join('-') : null;

  const [chatData, setChatData] = useState<any | null>(null);

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
    <VStack height="80vh" width="80vw" borderWidth={1} borderRadius="lg" padding={5}>
      <Box>{activeChatUser ? activeChatUser.firstName + ' ' + activeChatUser.lastName : ''}</Box>
      <Box flexGrow={1} overflowY="auto" width="100%">
        {chatData?.messages && Object.values(chatData.messages).sort((a, b) => new Date(a.date) - new Date(b.date)).map((message, index) => (
          <Text key={index}>
            <b>{message.user === user.uid ? 'You' : activeChatUser?.firstName}:</b> {message.content}
          </Text>
        ))}
      </Box>
      <Box width="100%">
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSend} isLoading={isAddingMessage}>
          Send
        </Button>
      </Box>
    </VStack>
  );
};

export default ChatBox;
