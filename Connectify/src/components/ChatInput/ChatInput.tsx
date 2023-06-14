import { useState } from "react";
import {
  Input,
  Button,
  HStack,
  useToast,
  Icon,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  useAddMessageToChatMutation,
  useAddMessageToChannelMutation,
  User,
} from "../../api/databaseApi";
import Emojis from "../ChatBox/Emojis/Emojis";
import useVoiceMessages from "../../Hooks/useVoiceMessages";
import { FaImage, FaMicrophone } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import GiphyDropdown from "../Gifs/Gifs";
import { useHandleSend } from "../../Hooks/useHandleSend";
import uploadImage from "../Upload Files/Upload Image/UploadImage";
import { User as FirebaseUser } from 'firebase/auth';

interface ChatInputProps {
  currUser: FirebaseUser | null;
  user: User;
  chatUserId: string;
  activeChatUser: User | null;
  isChat: boolean;
  teamId: string;
  channelId: string;
  isBot: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  currUser,
  user,
  chatUserId,
  activeChatUser,
  isChat,
  teamId,
  channelId,
  isBot,
}) => {
  const buttonColor = useColorModeValue("black", "white");
  const buttonBg = useColorModeValue("#f57c73", "#d84e45");
  const [message, setMessage] = useState<string>("");
  const [emojiPickerState, SetEmojiPickerState] = useState<boolean>(false);
  const [messagesForAI, setMessagesForAI] = useState<
    Array<{ role: string; content: string }>
  >([
    {
      role: "system",
      content:
        "You are Mimir, a wise being from Norse mythology. You're known for your wisdom, knowledge, and eloquence. Speak as such.",
    },
  ]);
  const [addMessageToChat] = useAddMessageToChatMutation();
  const [addMessageToChannel] = useAddMessageToChannelMutation();
  const toast = useToast();

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
    addMessageToChannel,
  });

  const handleGifSelect = (gifUrl: string) => {
    handleSend(gifUrl);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const url = await uploadImage(e.target.files[0]);
      handleSend(url, true);
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend(message);
              }
            }}
            flexGrow={1}
          />
          <IconButton
            onClick={() => handleSend(message)}
            color={buttonColor}
            bg={buttonBg}
            _hover={{ bg: buttonBg }}
            aria-label="Send Message"
            icon={<Icon as={BsFillSendFill} boxSize={6} />}
          />
          <IconButton
            as="label"
            htmlFor="image-upload"
            color={buttonColor}
            bg={buttonBg}
            cursor="pointer"
            aria-label="Upload Image"
            icon={<Icon as={FaImage} boxSize={6} />}
            _hover={{ bg: buttonBg }}
          />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
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
            onKeyDown={(e) => {
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
      <IconButton
        onClick={handleStart}
        color={buttonColor}
        bg={buttonBg}
        _hover={{ bg: buttonBg }}
        aria-label="Start Recording"
        icon={<Icon as={FaMicrophone} boxSize={6} />}
      />
    </HStack>
  );
};

export default ChatInput;
