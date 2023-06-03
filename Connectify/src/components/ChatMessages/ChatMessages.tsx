import { Box, Image, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure } from "@chakra-ui/react";
import Message from "../ChatBox/Single Message/Message";
import { useState } from "react";
import VoiceMessage from "../ChatBox/Voice Message/voiceMessage";

const ChatMessages = ({
  chatData,
  userId,
  activeChatUser,
  activeChatId,
  activeChatUserStatus,
  getStatusColor,
  isChat,
  teamId,
  channelId,
}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  return (
    <Box
      flexGrow={1}
      overflowY="auto"
      width="100%"
      overflowX="hidden"
    >
      {chatData?.messages &&
        Object.values(chatData.messages)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
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
                <VoiceMessage url={message.content} />
              ) : message.type === "gif" ? (
                <Image src={message.content} alt="GIF" />
              ) : message.type === "image" ? (
                <Image
                  src={message.content}
                  alt="Uploaded content"
                  maxW="300px"
                  cursor="pointer"
                  onClick={() => handleImageClick(message.content)}
                />
              ) : (
                <Message
                  key={message.uid}
                  message={message}
                  messageId={message.uid}
                  chatId={activeChatId}
                  getStatusColor={getStatusColor}
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
    </Box>
  );
};

export default ChatMessages;
