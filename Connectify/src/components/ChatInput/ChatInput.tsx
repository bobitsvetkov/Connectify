import { useState } from "react";
import { Input, Button, HStack, useToast, Icon } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import {
  useAddMessageToChatMutation,
  useAddMessageToChannelMutation,
  useUpdateUserLatestChatsMutation,
  useGetTeamByIdQuery,
} from "../../api/databaseApi";
import Emojis from "../ChatBox/Emojis/Emojis";
import useVoiceMessages from "../../Hooks/useVoiceMessages";
import { FaMicrophone } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import GiphyDropdown from "../Gifs/Gifs";

const ChatInput = ({
  currUser,
  user,
  chatUserId,
  activeChatUser,
  isChat,
  teamId,
  channelId,
}) => {
  const [message, setMessage] = useState<string>("");
  const [emojiPickerState, SetEmojiPickerState] = useState<boolean>(false);
  const [addMessageToChat, { isLoading: isAddingMessage }] =
    useAddMessageToChatMutation();
  const [addMessageToChannel, { isLoading: isAddingMessageToChannel }] =
    useAddMessageToChannelMutation();
  const toast = useToast();
  const [updateLatestChats, { isLoading: isUpdatingLatestChats }] =
    useUpdateUserLatestChatsMutation();
  const { data: team } = useGetTeamByIdQuery(teamId) || null;

  const { recording, handleStart, handleSendAudio } = useVoiceMessages(
    currUser,
    user,
    chatUserId,
    isChat,
    teamId,
    channelId,
    addMessageToChat,
    addMessageToChannel,
    toast
  );

  const handleGifSelect = (gifUrl) => {
    setMessage(gifUrl);
  };

  const handleSend = () => {
    if (message.trim().length > 0 && currUser && user) {
      const userIds = [chatUserId, user.username];
      userIds.sort();
      const chatId = userIds.join("-");

      const newMessage = {
        uid: uuidv4(),
        user: currUser.uid,
        type: message.includes('giphy.com') ? 'gif' : 'text',
        content: message,
        date: new Date().toISOString(),
      };

      if (isChat) {
        updateLatestChats({
          userUid: currUser.uid,
          chatUid: chatId,
          message: {
            ...newMessage,
            isChat: isChat,
            userChatting: activeChatUser.uid,
            userChattingUsername: chatUserId,
          },
        });
        updateLatestChats({
          userUid: activeChatUser.uid,
          chatUid: chatId,
          message: {
            ...newMessage,
            isChat: isChat,
            userChatting: currUser.uid,
            userChattingUsername: user.username,
          },
        });
        addMessageToChat({ chatId: chatId, message: newMessage });
      } else {
        updateLatestChats({
          userUid: currUser.uid,
          chatUid: channelId,
          message: {
            ...newMessage,
            isChat: isChat,
            teamId: teamId,
            channelId: channelId,
          },
        });
        Object.entries(team.participants).map(([userUid, isMember]) => {
          updateLatestChats({
            userUid: userUid,
            chatUid: channelId,
            message: {
              ...newMessage,
              isChat: isChat,
              teamId: teamId,
              channelId: channelId,
            },
          });
        });
        addMessageToChannel({
          teamId: teamId,
          channelId: channelId,
          message: newMessage,
        });
      }

      setMessage("");
    }
  };
  return (
    <HStack width="100%" spacing={4}>
      {!recording ? (
        <>
          <Emojis
            message={message}
            setMessage={setMessage}
            emojiPickerState={emojiPickerState}
            setEmojiPickerState={SetEmojiPickerState}
          />
          <GiphyDropdown onGifSelect={handleGifSelect} />
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
            isLoading={isAddingMessage || isAddingMessageToChannel}
            colorScheme="teal"
          >
            <Icon
              as={BsFillSendFill}
              boxSize={6}
              style={{ fontSize: "24px" }}
            />
          </Button>
        </>
      ) : (
        <>
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
          <Button onClick={handleSendAudio} colorScheme="blue">
            Send Recording
          </Button>
        </>
      )}
      <Button onClick={handleStart} colorScheme="teal">
        <Icon as={FaMicrophone} boxSize={6} style={{ fontSize: "24px" }} />
      </Button>
    </HStack>
  );
};
export default ChatInput;
