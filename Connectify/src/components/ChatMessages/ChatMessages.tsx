import {
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import SingleMessage from "../ChatBox/Single Message/Message";
import { useState, useRef, useEffect } from "react";
import VoiceMessage from "../ChatBox/Voice Message/voiceMessage";
import DeleteMessage from "../ChatBox/Delete/DeleteMessage";
import { Message } from "../../api/databaseApi";
import { ChatData } from "../../types/interfaces";
import { TiDeleteOutline } from "react-icons/ti";
interface ChatMessagesProps {
  chatData: ChatData | undefined;
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
    if (messagesEndRef.current) {
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
      {chatData?.messages &&
        Object.values(chatData.messages)
          .filter((message: Message) => message.date !== undefined)
          .sort(
            (a: Message, b: Message) =>
              new Date(a.date ?? "").getTime() -
              new Date(b.date ?? "").getTime()
          )
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
                <Flex direction="column" align="flex-end">
                  <IconButton
                    aria-label="Delete Voice message"
                    size={"xxs"}
                    mr={1}
                    as={TiDeleteOutline}
                    onClick={() => setIsDeleting(true)}
                  >
                    Delete Audio
                  </IconButton>

                  <Box>
                    <VoiceMessage url={message.content} />
                    <DeleteMessage
                      chatId={activeChatId}
                      messageId={message.uid}
                      teamId={teamId}
                      isDeleting={isDeleting}
                      setIsDeleting={setIsDeleting}
                      message={message}
                    />
                  </Box>
                </Flex>
              ) : message.type === "gif" ? (
                <Flex direction="column" align="flex-end">
                  <IconButton
                    aria-label="Delete Gif"
                    as={TiDeleteOutline}
                    onClick={() => setIsDeleting(true)}
                    size={"xxs"}
                  >
                    Delete GIF
                  </IconButton>
                  <Box>
                    <Image src={message.content} alt="GIF" />

                    <DeleteMessage
                      chatId={activeChatId}
                      messageId={message.uid}
                      teamId={teamId}
                      isDeleting={isDeleting}
                      setIsDeleting={setIsDeleting}
                      message={message}
                    />
                  </Box>
                </Flex>
              ) : message.type === "image" ? (
                <Flex direction="column" align="flex-end">
                  <IconButton
                    aria-label="Delete Image"
                    as={TiDeleteOutline}
                    onClick={() => setIsDeleting(true)}
                    size={"xxs"}
                  >
                    Delete Image
                  </IconButton>
                  <Box>
                    <Image
                      src={message.content}
                      alt="Uploaded content"
                      maxW="300px"
                      cursor="pointer"
                      onClick={() => handleImageClick(message.content)}
                    />
                    <DeleteMessage
                      chatId={activeChatId}
                      messageId={message.uid}
                      teamId={teamId}
                      isDeleting={isDeleting}
                      setIsDeleting={setIsDeleting}
                      message={message}
                    />
                  </Box>
                </Flex>
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
