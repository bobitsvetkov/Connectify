import { useState } from "react";
import { Input, Button, HStack, useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useAddMessageToChatMutation, useAddMessageToChannelMutation, useUpdateUserLatestChatsMutation, useGetTeamByIdQuery, User } from "../../api/databaseApi";
import Emojis from "../ChatBox/Emojis/Emojis";
import useVoiceMessages from "../../Hooks/useVoiceMessages";
import { useLazyGenerateConversationQuery } from "../../api/openAiApi";
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
  const [updateLatestChats] = useUpdateUserLatestChatsMutation();
  const { data: team } = useGetTeamByIdQuery(teamId) || null;
  const { recording, handleStart, handleSendAudio } = useVoiceMessages(currUser, user, chatUserId, isChat, teamId, channelId, addMessageToChat, addMessageToChannel, toast);
  const [executeGenerateConversation] = useLazyGenerateConversationQuery();

  const userIds = [chatUserId, user.username];
  userIds.sort();
  const chatId = userIds.join("-");

  const handleSend = async () => {
    const newMessage = {
      uid: uuidv4(),
      user: currUser.uid,
      content: message,
      date: new Date().toISOString(),
    };

    if (message.trim().length > 0 && currUser && user) {
      if (isChat) {
        updateLatestChats({ userUid: currUser.uid, chatUid: chatId, message: { ...newMessage, isChat: isChat, userChatting: activeChatUser.uid, userChattingUsername: chatUserId } });
        updateLatestChats({ userUid: activeChatUser.uid, chatUid: chatId, message: { ...newMessage, isChat: isChat, userChatting: currUser.uid, userChattingUsername: user.username } });
        addMessageToChat({ chatId: chatId, message: newMessage });
      } else {

        updateLatestChats({ userUid: currUser.uid, chatUid: channelId, message: { ...newMessage, isChat: isChat, teamId: teamId, channelId: channelId } });
        Object.entries(team.participants).map(([userUid, isMember]) => {
          updateLatestChats({ userUid: userUid, chatUid: channelId, message: { ...newMessage, isChat: isChat, teamId: teamId, channelId: channelId } });
        })
        addMessageToChannel({ teamId: teamId, channelId: channelId, message: newMessage });
      }

      setMessage("");
    }

    if (isBot) {
      const updatedMessagesForAI = [
        ...messagesForAI,
        { "role": "system", "content": "You are Mimir, a wise being from Norse mythology. You're known for your wisdom, knowledge, and eloquence. Speak as such." },
        { role: 'user', content: message }
      ];
    
      setMessagesForAI(updatedMessagesForAI);

      try {
        const generatedMessage = await executeGenerateConversation(updatedMessagesForAI);

        if (generatedMessage.data) {
          const aiMessage = {
            uid: uuidv4(),
            user: chatUserId,
            content: generatedMessage.data.choices[0].message.content,
            date: new Date().toISOString(),
            isGenerated: true,
          };

          addMessageToChat({ chatId: chatId, message: aiMessage });
        }
      } catch (error) {
        toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
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
