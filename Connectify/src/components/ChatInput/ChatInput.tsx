import { useState, useEffect } from "react";
import { Input, Button, HStack, useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useAddMessageToChatMutation, useAddMessageToChannelMutation, useUpdateUserLatestChatsMutation, useGetTeamByIdQuery } from "../../api/databaseApi";
import Emojis from "../ChatBox/Emojis/Emojis";
import useVoiceMessages from "../../Hooks/useVoiceMessages";
import { useGenerateConversationQuery } from "../../api/openAiApi";

const ChatInput = ({ currUser, user, chatUserId, activeChatUser, isChat, teamId, channelId }) => {
  const [message, setMessage] = useState<string>("");
  const [fullMessage, setFullMessage] = useState<string>("");
  const [emojiPickerState, SetEmojiPickerState] = useState<boolean>(false);
  const [messagesForAI, setMessagesForAI] = useState<Array<{ role: string, content: string }>>([{"role": "system", "content": "You are a helpful assistant."}]);

  const [addMessageToChat, { isLoading: isAddingMessage }] = useAddMessageToChatMutation();
  const [addMessageToChannel, { isLoading: isAddingMessageToChannel }] = useAddMessageToChannelMutation();
  const toast = useToast();
  const [updateLatestChats, { isLoading: isUpdatingLatestChats }] = useUpdateUserLatestChatsMutation();
  const { data: team } = useGetTeamByIdQuery(teamId) || null;

  const { recording, handleStart, handleSendAudio } = useVoiceMessages(currUser, user, chatUserId, isChat, teamId, channelId, addMessageToChat, addMessageToChannel, toast);

  const triggerGeneration = message.trim().length > 0;

  const { data: generatedMessage, error } = useGenerateConversationQuery(messagesForAI, { skip: !triggerGeneration });

  console.log("Generated Message: ", generatedMessage);

  const userIds = [chatUserId, user.username];
  userIds.sort();
  const chatId = userIds.join("-");

  useEffect(() => {
    if (generatedMessage && !error) {
      const aiMessage = {
        uid: uuidv4(),
        user: currUser.uid,
        content: generatedMessage.choices[0].message.content,  // Extract the generated message content
        date: new Date().toISOString(),
        isGenerated: true,  // Additional field to indicate that this message was generated
      };

      console.log(aiMessage)

      addMessageToChat({ chatId: chatId, message: aiMessage });
      setMessage(""); // Clear message input after sending AI message
    } else if (error) {
      // Optional: handle the case where the generated message was not successfully retrieved
      console.error(error);
    }
  }, [generatedMessage, error]);


  const handleSend = () => {

    setMessagesForAI(prev => [
      ...prev,
      { role: 'user', content: message }
    ]);


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
    // if (generatedMessage && !error) {
    //   const aiMessage = {
    //     uid: uuidv4(),
    //     user: currUser.uid,
    //     content: generatedMessage.choices[0].text,  // Extract the generated message text
    //     date: new Date().toISOString(),
    //     isGenerated: true,  // Additional field to indicate that this message was generated
    //   };

    //   console.log(aiMessage)

    //   addMessageToChat({ chatId: chatId, message: aiMessage });
    //   setMessage(""); // Clear message input after sending AI message
    // } else {
    //   // Optional: handle the case where the generated message was not successfully retrieved
    //   console.error(error);
    // }
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
          isLoading={isAddingMessage || isAddingMessageToChannel}
          colorScheme="teal"
        >
          Send
        </Button>
      ) : (
        !recording ? (
          <Button
            onClick={handleStart}
            colorScheme="teal"
          >
            Record
          </Button>
        ) : (
          <>
            <Button
              onClick={handleSendAudio}
              colorScheme="blue"
            >
              Send Audio
            </Button>
          </>
        )
      )}
    </HStack>
  )
}

export default ChatInput;
