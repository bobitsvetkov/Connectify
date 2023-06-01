import { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useGetBotConversationsQuery } from '../../api/databaseApi';
// import BotConversation from "./BotConversation";

const BotConversationsList = () => {
//   const { data: conversations, isLoading, isError } = useGetBotConversationsQuery();
//   const [selectedConversation, setSelectedConversation] = useState(null);

//   if (isLoading) {
//     return <Box>Loading...</Box>;
//   }

//   if (isError) {
//     return <Box>Error loading conversations</Box>;
//   }

  return (
    <Box>
      {/* {conversations && conversations.map((conversation) => (
        <Button key={conversation.id} onClick={() => setSelectedConversation(conversation)}>
          <Text>{conversation.title}</Text>
        </Button>
      ))}
      {selectedConversation && <BotConversation conversation={selectedConversation} />} */}
    </Box>
  );
};

export default BotConversationsList;