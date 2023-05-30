import React, { useState } from "react";
import { Input, Button, HStack } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useAddMessageToChatMutation, useAddMessageToChannelMutation } from "../../api/databaseApi";
import Emojis from "../ChatBox/Emojis/Emojis";

const ChatInput = ({ currUser, user, chatUserId, activeChatUser, isChat, teamId, channelId }) => {
  const [message, setMessage] = useState<string>("");
  const [emojiPickerState, SetEmojiPickerState] = useState<boolean>(false);
  const [addMessageToChat, { isLoading: isAddingMessage }] = useAddMessageToChatMutation();
  const [addMessageToChannel, { isLoading: isAddingMessageToChannel }] = useAddMessageToChannelMutation();

  const handleSend = () => {
    if (message.trim().length > 0 && currUser && user) {
      const userIds = [chatUserId, user.username];
      userIds.sort();
      const chatId = userIds.join("-");

      const newMessage = {
        uid: uuidv4(),
        user: currUser.uid,
        content: message,
        date: new Date().toISOString(),
      };

      if (isChat) {
        addMessageToChat({ chatId: chatId, message: newMessage });
      } else {
        addMessageToChannel({ teamId: teamId, channelId: channelId, message: newMessage })
      }

      setMessage("");
    }
  };

  return (
    <HStack width="100%" spacing={4}>
      <Emojis
        message={message}
        setMessage={setMessage}
        emojiPickerState={emojiPickerState}
        setEmojiPickerState={SetEmojiPickerState}
      />
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
      />
      <Button
        onClick={handleSend}
        isLoading={isAddingMessage}
        colorScheme="teal"
      >
        Send
      </Button>
    </HStack>
  )
}

export default ChatInput;
