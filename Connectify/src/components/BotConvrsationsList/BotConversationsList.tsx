import { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
// import { useGetBotConversationsQuery } from '../../api/databaseApi';
// import BotConversation from "./BotConversation";
import { useNavigate } from "react-router-dom";

const BotConversationsList = () => {
    //   const { data: conversations, isLoading, isError } = useGetBotConversationsQuery();
    //   const [selectedConversation, setSelectedConversation] = useState(null);

    //   if (isLoading) {
    //     return <Box>Loading...</Box>;
    //   }

    //   if (isError) {
    //     return <Box>Error loading conversations</Box>;
    //   }

    const navigate = useNavigate();


    return (
        // <Box>
        //   {/* {conversations && conversations.map((conversation) => (
        //     <Button key={conversation.id} onClick={() => setSelectedConversation(conversation)}>
        //       <Text>{conversation.title}</Text>
        //     </Button>
        //   ))}
        //   {selectedConversation && <BotConversation conversation={selectedConversation} />} */}

        // </Box>
        <Button onClick={() => navigate("/chat/mimir")}>Go to Mimir Chat</Button>

    );
};

export default BotConversationsList;