import React, { useState } from "react";
import { useSelector, } from "react-redux";
import { Box, VStack, Input, Button, Text } from "@chakra-ui/react";
import { selectMessages } from "../../features/ChatSlice";
import { v4 as uuidv4 } from 'uuid';
import { RootState } from "../../store";
import { useGetChatsQuery, useCreateChatMutation, useAddMessageToChatMutation } from "../../api/ChatsApi";
import { getAuth } from "firebase/auth";
import { User } from '../../api/UsersApi';

const ChatBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const messages = useSelector(selectMessages);
  const activeChatUser: User | null = useSelector((state: RootState) => state.activeUser.user);
  const [createChat, { isLoading: isCreatingChat }] = useCreateChatMutation();
  const [addMessageToChat, { isLoading: isAddingMessage }] = useAddMessageToChatMutation();
  const { data: chats = {} } = useGetChatsQuery();
  const auth = getAuth();
  const currUser = auth.currentUser;

  const handleSend = () => {
    if (message.trim().length > 0 && currUser) {
      const userIds = [activeChatUser.username, currUser.uid];
      userIds.sort();
      const chatId = userIds.join('-'); 

      const newMessage = {
        id: uuidv4(),
        user: currUser.uid,
        content: message,
        date: new Date().toISOString(),
      };

      if (chats[chatId]) {
        addMessageToChat({ chatId, message: newMessage });
      } else {
        createChat({
          id: chatId,
          participants: userIds,
          messages: { [newMessage.id]: newMessage },
        });
      }
      setMessage("");
    }
  };

  return (
    <VStack height="80vh" width="80vw" borderWidth={1} borderRadius="lg" padding={5}>
      <Box>{activeChatUser ? activeChatUser.firstName + ' ' + activeChatUser.lastName : ''}</Box>
      <Box flexGrow={1} overflowY="auto" width="100%">
        {messages.map((message) => (
          <Text key={message.id}>
            <b>{message.user}: </b>
            {message.content}
          </Text>
        ))}
      </Box>
      <Box width="100%">
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSend} isLoading={isCreatingChat || isAddingMessage}>
          Send
        </Button>
      </Box>
    </VStack>
  );
};

export default ChatBox;
