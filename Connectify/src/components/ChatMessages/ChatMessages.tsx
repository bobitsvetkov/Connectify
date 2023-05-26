import { Box } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";

const ChatMessages = ({ chatData, userId, activeChatUser }) => (
  <Box flexGrow={1} overflowY="auto" width="100%" marginBottom={20}>
    {chatData?.messages &&
      Object.values(chatData.messages)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((message, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent={
              message.user === userId ? "flex-end" : "flex-start"
            }
            marginBottom="1rem"
          >
            {message.user !== userId && (
              <Avatar
                size="sm"
                name={activeChatUser?.firstName}
                src={activeChatUser?.avatar}
                marginRight="0.5rem"
              />
            )}
            <Box
              maxWidth="40%"
              padding="1rem 1rem"
              borderRadius="lg"
              backgroundColor={
                message.user === userId ? "blue.500" : "#a2adbb"
              }
              color={message.user === userId ? "white" : "black"}
            >
              {message.content}
            </Box>
          </Box>
        ))}
  </Box>
);

export default ChatMessages;
