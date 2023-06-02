import { useState } from "react";
import { Input, Button, HStack, useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useAddMessageToChatMutation, useAddMessageToChannelMutation, useUpdateUserLatestChatsMutation, useGetTeamByIdQuery, User } from "../../api/databaseApi";
import Emojis from "../ChatBox/Emojis/Emojis";
import useVoiceMessages from "../../Hooks/useVoiceMessages";
import { useLazyGenerateConversationQuery } from "../../api/openAiApi";
import { useHandleSend } from "../../Hooks/useHandleSend";
interface ChatInputProps {
  currUser: object,
  user: User,
  chatUserId: string,
  activeChatUser: User,
  isChat: boolean,
  teamId: string,
  channelId: string,
  isBot: boolean,
}

const ChatInput: React.FC<ChatInputProps> = ({ currUser, user, chatUserId, activeChatUser, isChat, teamId, channelId, isBot }) => {
  const [message, setMessage] = useState<string>("");
  const [emojiPickerState, SetEmojiPickerState] = useState<boolean>(false);
  const [messagesForAI, setMessagesForAI] = useState<Array<{ role: string, content: string }>>([{ "role": "system", "content": "You are Mimir, a wise being from Norse mythology. You're known for your wisdom, knowledge, and eloquence. Speak as such." }]);
  const [addMessageToChat] = useAddMessageToChatMutation();
  const [addMessageToChannel] = useAddMessageToChannelMutation();
  const toast = useToast();


  const { recording, handleStart, handleSendAudio } = useVoiceMessages(currUser, user, chatUserId, isChat, teamId, channelId, addMessageToChat, addMessageToChannel, toast);

  const handleSend = useHandleSend({
    currUser, 
    user, 
    chatUserId, 
    activeChatUser, 
    isChat, 
    teamId, 
    channelId, 
    isBot, 
    message,
    messagesForAI,
    setMessagesForAI,
    setMessage,
    addMessageToChat,
    addMessageToChannel
  });


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
      {message ? (
        <Button
          onClick={handleSend}
          colorScheme="teal"
        >
          Send
        </Button>
      ) : (
        <Button
          onClick={!recording ? handleStart : handleSendAudio}
          colorScheme={!recording ? "teal" : "blue"}
        >
          {!recording ? "Record" : "Send Audio"}
        </Button>
      )}
    </HStack>
  );
};

export default ChatInput;
