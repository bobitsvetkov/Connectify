import {
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import SingleMessage from "../ChatBox/Single Message/Message";
import { useState, useRef, useEffect } from "react";
import VoiceMessage from "../ChatBox/Voice Message/voiceMessage";
import DeleteMessage from "../ChatBox/Delete/DeleteMessage";
import { Message } from "../../api/databaseApi";

interface ChatMessagesProps {
  chatData: Message[] | undefined;
  userId: string;
  activeChatUser: string;
  activeChatId: string | undefined;
  activeChatUserStatus: string;
  getStatusColor: (status: string) => string; // Define the function type explicitly
  isChat: boolean;
  teamId: string | undefined;
  channelId: string | undefined;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  chatData,
  userId,
  activeChatId,
  getStatusColor,
  isChat,
  teamId,
  channelId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current){
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(scrollToBottom, [chatData]);
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  return (
    <Box flexGrow={1} overflowY="auto" width="100%" overflowX="hidden">
      {chatData && // Remove .messages from chatData
        chatData
        .filter((message: Message) => message.date !== undefined)
        .sort((a: Message, b: Message) => new Date(a.date ?? "").getTime() - new Date(b.date ?? "").getTime())
          .map((message) => (
            <Box
              key={message.uid}
              display="flex"
              alignItems="center"
              justifyContent={
                message.user === userId ? "flex-end" : "flex-start"
              }
              marginBottom="1rem"
            >
              {message.type === "audio" ? (
                <div>
                  <VoiceMessage url={message.content} />
                  <Button onClick={() => setIsDeleting(true)}>
                    Delete Audio
                  </Button>
                  <DeleteMessage
                    chatId={activeChatId}
                    messageId={message.uid}
                    teamId={teamId}
                    isDeleting={isDeleting}
                    setIsDeleting={setIsDeleting}
                    message={message}
                  />
                </div>
              ) : message.type === "gif" ? (
                <div>
                  <Image src={message.content} alt="GIF" />
                  <Button onClick={() => setIsDeleting(true)}>
                    Delete GIF
                  </Button>
                  <DeleteMessage
                    chatId={activeChatId}
                    messageId={message.uid}
                    teamId={teamId}
                    isDeleting={isDeleting}
                    setIsDeleting={setIsDeleting}
                    message={message}
                  />
                </div>
              ) : message.type === "image" ? (
                <div>
                  <Image
                    src={message.content}
                    alt="Uploaded content"
                    maxW="300px"
                    cursor="pointer"
                    onClick={() => handleImageClick(message.content)}
                  />
                  <Button onClick={() => setIsDeleting(true)}>
                    Delete Image
                  </Button>
                  <DeleteMessage
                    chatId={activeChatId}
                    messageId={message.uid}
                    teamId={teamId}
                    isDeleting={isDeleting}
                    setIsDeleting={setIsDeleting}
                    message={message}
                  />
                </div>
              ) : (
                  <SingleMessage
                  key={message.uid}
                  message={message}
                  messageId={message.uid}
                  chatId={activeChatId}
                  getStatusColor={(status: string) => getStatusColor(status)}
                  isChat={isChat}
                  teamId={teamId}
                  channelId={channelId}
                />
              )}
            </Box>
          ))}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Image src={selectedImage} alt="Selected content" />
          </ModalBody>
        </ModalContent>
      </Modal>
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatMessages;
