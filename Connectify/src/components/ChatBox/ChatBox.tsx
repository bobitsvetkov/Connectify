import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, VStack, Input, Button, Text } from "@chakra-ui/react";
import { sendMessage, selectMessages } from "../../features/ChatSlice";
import { v4 as uuidv4 } from 'uuid';

const ChatBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();

  const handleSend = () => {
    if (message.trim().length > 0) {
      dispatch(sendMessage({ id: uuidv4(), user: "User1", content: message }));
      setMessage("");
    }
  };

  return (
    <VStack height="80vh" width="80vw" borderWidth={1} borderRadius="lg" padding={5}>
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
        <Button onClick={handleSend}>Send</Button>
      </Box>
    </VStack>
  );
};

export default ChatBox;
