import { useState } from "react";
import { useAddReplyToMessageMutation } from "../../../api/databaseApi";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../../store";
import { VStack, Avatar, Box, Flex, Text, HStack, Button, Input } from "@chakra-ui/react";

function Message({ message, messageId, chatId, setReplyTo }) {
    const [addReplyToMessage] = useAddReplyToMessageMutation();
    const currUser = useSelector((state: RootState) => state.auth.user);

    const [replyInputShown, setReplyInputShown] = useState(false);
    const [replyContent, setReplyContent] = useState("");

    const handleReply = () => {
        if (!currUser) {
            return null;
        }

        const reply = {
            id: uuidv4(),
            user: currUser.uid,
            content: `Reply: ${replyContent}`,
            date: new Date().toISOString(),
        };

        addReplyToMessage({ chatId, messageId, reply });
        setReplyContent("");
        setReplyInputShown(false);
        setReplyTo(null);
    };
    return (
        <VStack align="flex-start" spacing={4}>
            <Flex align="center">
                <Avatar name={message.user} size="sm" />
                <Box
                    maxW={"lg"}
                    w={"full"}
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    p={6}
                    textAlign="left"
                    bg={message.user === (currUser?.uid || '') ? "teal.200" : "gray.200"}
                    color="black"
                >
                    <Text>{message.content}</Text>
                    <Text fontSize="sm" mt={2}>
                        {new Date(message.date).toLocaleTimeString()}
                    </Text>
                </Box>
                <Button
                    onClick={() => setReplyInputShown(true)}
                    size="sm"
                    variant="ghost"
                    colorScheme="teal"
                >
                    Reply
                </Button>
            </Flex>
            {replyInputShown && (
                <Flex align="center">
                    <Avatar name={currUser?.uid} size="sm" />
                    <Input
                        type="text"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Type your reply..."
                    />
                    <Button
                        onClick={handleReply}
                        size="sm"
                        variant="solid"
                        colorScheme="teal"
                    >
                        Submit
                    </Button>
                </Flex>
            )}
            {message.replies &&
                Object.values(message.replies).map((reply) => (
                    <HStack key={reply.id} spacing={4} pl={8}>
                        <Avatar name={reply.user} size="sm" />
                        <Box
                            maxW={"lg"}
                            w={"full"}
                            boxShadow={"2xl"}
                            rounded={"lg"}
                            p={6}
                            textAlign="left"
                            bg="gray.100"
                            color="black"
                        >
                            <Text>{reply.content}</Text>
                            <Text fontSize="sm" mt={2}>
                                {new Date(reply.date).toLocaleTimeString()}
                            </Text>
                        </Box>
                    </HStack>
                ))}
        </VStack>
    );
}

export default Message;