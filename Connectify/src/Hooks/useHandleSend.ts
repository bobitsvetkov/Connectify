
import { v4 as uuidv4 } from "uuid";
import { useAddMessageToChatMutation, useAddMessageToChannelMutation, useUpdateUserLatestChatsMutation, useGetTeamByIdQuery, User } from "../api/databaseApi";
import { useLazyGenerateConversationQuery } from "../api/openAiApi";
import { useToast } from "@chakra-ui/react";

type AddMessageToChatMutation = ReturnType<typeof useAddMessageToChatMutation>[0];
type AddMessageToChannelMutation = ReturnType<typeof useAddMessageToChannelMutation>[0];

interface HandleSendProps {
    currUser: object,
    user: User,
    chatUserId: string,
    activeChatUser: User,
    isChat: boolean,
    teamId: string,
    channelId: string,
    isBot: boolean,
    message: string,
    messagesForAI: Array<{ role: string, content: string }>,
    setMessagesForAI: (messages: Array<{ role: string, content: string }>) => void,
    setMessage: (message: string) => void,
    addMessageToChat: AddMessageToChatMutation,
    addMessageToChannel: AddMessageToChannelMutation,
}

export const useHandleSend = ({
    currUser,
    user,
    chatUserId,
    activeChatUser,
    isChat,
    teamId,
    channelId,
    isBot,
    message,
    messagesForAI,
    setMessagesForAI,
    setMessage,
    addMessageToChat,
    addMessageToChannel
}: HandleSendProps) => {
    const toast = useToast();
    const [updateLatestChats] = useUpdateUserLatestChatsMutation();
    const { data: team } = useGetTeamByIdQuery(teamId) || null;
    const [executeGenerateConversation] = useLazyGenerateConversationQuery();

    const userIds = [chatUserId, user.username];
    userIds.sort();
    const chatId = userIds.join("-");

    const handleSend = async (msg?: string, isImage?: boolean) => {
        const messageToSend = msg || message;
        const type = isImage
            ? 'image'
            : messageToSend.includes('giphy.com')
                ? 'gif'
                : 'text';

        const newMessage = {
            uid: uuidv4(),
            user: currUser.uid,
            content: messageToSend,
            date: new Date().toISOString(),
            type: type,
        };

        if (messageToSend.trim().length > 0 && currUser && user) {
            if (isChat) {
                updateLatestChats({ userUid: currUser.uid, chatUid: chatId, message: { ...newMessage, isChat: isChat, userChatting: activeChatUser.uid, userChattingUsername: chatUserId } });
                updateLatestChats({ userUid: activeChatUser.uid, chatUid: chatId, message: { ...newMessage, isChat: isChat, userChatting: currUser.uid, userChattingUsername: user.username } });
                addMessageToChat({ chatId: chatId, message: newMessage });
            } else {

                updateLatestChats({ userUid: currUser.uid, chatUid: channelId, message: { ...newMessage, isChat: isChat, teamId: teamId, channelId: channelId } });
                Object.entries(team.participants).map(([userUid, isMember]) => {
                    updateLatestChats({ userUid: userUid, chatUid: channelId, message: { ...newMessage, isChat: isChat, teamId: teamId, channelId: channelId } });
                })
                addMessageToChannel({ teamId: teamId, channelId: channelId, message: newMessage });
            }

            setMessage("");
        }

        if (isBot && !isImage) {
            const updatedMessagesForAI = [
                ...messagesForAI,
                { "role": "system", "content": "You are Mimir, a wise being from Norse mythology. You're known for your wisdom, knowledge, and eloquence. Speak as such." },
                { role: 'user', content: messageToSend }
            ];

            setMessagesForAI(updatedMessagesForAI);

            try {
                const generatedMessage = await executeGenerateConversation(updatedMessagesForAI);

                if (generatedMessage.data) {
                    const aiMessage = {
                        uid: uuidv4(),
                        user: chatUserId,
                        content: generatedMessage.data.choices[0].message.content,
                        date: new Date().toISOString(),
                        isGenerated: true,
                    };

                    addMessageToChat({ chatId: chatId, message: aiMessage });
                }
            } catch (error) {
                toast({
                    title: "An error occurred.",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
    };


    return handleSend;
};
