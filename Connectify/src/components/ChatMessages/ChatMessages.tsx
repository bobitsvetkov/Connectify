import { Box } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import Message from "../ChatBox/Single Message/Message";
import { useState } from "react";
import VoiceMessage from "../ChatBox/Voice Message/voiceMessage";
import { AvatarBadge } from "@chakra-ui/react";

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
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = (messageId) => {
    setReplyTo(messageId);
  };

  return (
    <Box
      flexGrow={1}
      overflowY="auto"
      width="100%"
      // marginBottom={20}
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
              ) : (
                <Message
                  key={message.uid}
                  message={message}
                  messageId={message.uid}
                  chatId={activeChatId}
                  setReplyTo={setReplyTo}
                  getStatusColor={getStatusColor}
                  isChat={isChat}
                  teamId={teamId}
                  channelId={channelId}
                />
              )}
            </Box>
          ))}
    </Box>
  );
};

export default ChatMessages;
