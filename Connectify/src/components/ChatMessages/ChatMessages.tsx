import { Box, Image, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure, Button } from "@chakra-ui/react";
import Message from "../ChatBox/Single Message/Message";
import { useState } from "react";
import VoiceMessage from "../ChatBox/Voice Message/voiceMessage";
import DeleteMessage from "../ChatBox/Delete/DeleteMessage";

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
  const [isDeleting, setIsDeleting] = useState(false);

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
                <div>
                  <VoiceMessage url={message.content} />
                  <Button onClick={() => setIsDeleting(true)}>Delete Audio</Button>
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
                  <Button onClick={() => setIsDeleting(true)}>Delete GIF</Button>
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
                  <Button onClick={() => setIsDeleting(true)}>Delete Image</Button>
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
                <Message
                  key={message.uid}
                  message={message}
                  messageId={message.uid}
                  chatId={activeChatId}
                  getStatusColor={getStatusColor}
                  isChat={isChat}
                  teamId={teamId}
                  channelId={channelId}
                  isDeleting={isDeleting}
                  setIsDeleting={setIsDeleting}
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
