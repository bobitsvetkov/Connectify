import { useState } from "react";
import { useAddReplyToMessageMutation } from "../../../api/databaseApi";
import { useAddReactionToMessageMutation } from "../../../api/databaseApi";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../../store";
import { VStack, Avatar, Box, Flex, Text, HStack, Button, Input } from "@chakra-ui/react";
import EmojiReactions from "../Reactions/EmojiReaction";

function Message({ message, messageId, chatId, setReplyTo }) {
    const [addReplyToMessage] = useAddReplyToMessageMutation();
    const currUser = useSelector((state: RootState) => state.activeUser.user);
    const [addReactionToMessage] = useAddReactionToMessageMutation();
    const [replyInputShown, setReplyInputShown] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    if (!messageId) {
        return <div>Loading...</div>; // Add loading state
    }

    const addReaction = (emoji) => {
        if (!currUser) {
            console.log("Current user is not defined");
            return;
        }

        console.log(`Add reaction ${emoji} to message ${messageId}`);

        const reaction = {
            uid: uuidv4(),
            emoji: emoji,
            user: currUser.uid
        };

        addReactionToMessage({ chatId, messageId, reaction });
    };

    const handleReply = () => {
        if (!currUser) {
            return null;
        }

        const reply = {
            uid: uuidv4(),
            user: currUser.uid,
            content: `Reply: ${replyContent}`,
            date: new Date().toISOString(),
            reactions: {},  // New reactions field for each reply
        };

        console.log("chatId", chatId); // Add this
        console.log("messageId", messageId); // Add this
        console.log("reply", reply); // Add this

        addReplyToMessage({ chatId, messageId, reply });
        setReplyContent("");
        setReplyInputShown(false);
        setReplyTo(null);
    };

    // const getAvatarInitials = (message) => {
    //     if (!message.user) {
    //         return ''; // or any default value you prefer
    //     }
        

    //     const initials = `${message.user.firstName?.charAt(0)}${message.user.lastName?.charAt(0)}`;
    //     return initials.toUpperCase();
    // };
      console.log("message", message); 
    return (
        <VStack align="flex-start" spacing={4}>
            <Flex align="center">
                {/* <Avatar name={getAvatarInitials(message)} size="sm" /> */}
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
                <EmojiReactions messageId={messageId} addReaction={addReaction} />
            </Flex>
            {replyInputShown && (
                <Flex align="center">
                    {/* <Avatar name={getAvatarInitials(reply)} size="sm" /> */}

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
            {message.reactions &&
                Object.values(message.reactions).map((reaction) => (
                    <span key={reaction.uid}>{reaction.emoji}</span>
                ))
            }
            {message.replies &&
                Object.values(message.replies).map((reply) => (
                    <HStack key={reply.uid} spacing={4} pl={8}>
                        {/* <Avatar name={getAvatarInitials(reply.firstName, reply.lastName)} size="sm" /> */}
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
                            <Box>
                                {message.reactions && Object.values(message.reactions).map(reaction => <span key={reaction.uid}>{reaction.emoji}</span>)}
                                <EmojiReactions messageId={reply.uid} addReaction={(emoji) => addReaction(emoji, reply.uid)} />
                            </Box>
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
