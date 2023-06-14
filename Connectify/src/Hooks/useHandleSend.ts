import { v4 as uuidv4 } from "uuid";
import { useAddMessageToChatMutation, useAddMessageToChannelMutation, useUpdateUserLatestChatsMutation, useGetTeamByIdQuery, useUpdateUserNotificationsMutation } from "../api/databaseApi";
import { useLazyGenerateConversationQuery } from "../api/openAiApi";
import { useToast } from "@chakra-ui/react";
import { Message, User } from "../types/interfaces";
import { User as FirebaseUser } from 'firebase/auth';

type AddMessageToChatMutation = ReturnType<typeof useAddMessageToChatMutation>[0];
type AddMessageToChannelMutation = ReturnType<typeof useAddMessageToChannelMutation>[0];

interface HandleSendProps {
    currUser: FirebaseUser,
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
    messagesForAI,
    setMessagesForAI,
    setMessage,
    addMessageToChat,
    addMessageToChannel
}: HandleSendProps) => {
    const toast = useToast();
    const [updateLatestChats] = useUpdateUserLatestChatsMutation();
    const [updateUserNotifications] = useUpdateUserNotificationsMutation();
    const { data: team } = useGetTeamByIdQuery(teamId) || null;
    const [executeGenerateConversation] = useLazyGenerateConversationQuery();

    const userIds = [chatUserId, user.username];
    userIds.sort();
    const chatId = userIds.join("-");

    const handleSend = async (msg?: string | { downloadURL: string, fileName: string }, isImage?: boolean) => {
        let content, type, fileName = undefined; // use undefined here

        if (typeof msg === 'string') {
            content = msg;
            type = content.includes('giphy.com') ? 'gif' : 'text';
        } else if (msg && 'downloadURL' in msg && 'fileName' in msg) {
            content = msg.downloadURL;
            type = 'image';
            fileName = msg.fileName;
        } else {
            console.error('Invalid message:', msg);
            return;
        }

        const newMessage: Message = {
            uid: uuidv4(),
            user: currUser.uid,
            content: content,
            date: new Date().toISOString(),
            type: type as "audio" | "image" | "text" | "gif",
        };

        if (fileName) {
            newMessage.fileName = fileName;
        }

        if (content.trim().length > 0 && currUser && user) {
            if (isChat) {
                updateUserNotifications({ userUid: activeChatUser.uid, notificationUid: newMessage.uid, notification: { ...newMessage, isSeen: false, wasShown: false, isChat: isChat, owner: activeChatUser.uid } });
                updateLatestChats({ userUid: currUser.uid, chatUid: chatId, message: { ...newMessage, isChat: isChat, userChatting: activeChatUser.uid, userChattingUsername: chatUserId } });
                updateLatestChats({ userUid: activeChatUser.uid, chatUid: chatId, message: { ...newMessage, isChat: isChat, userChatting: currUser.uid, userChattingUsername: user.username } });
                addMessageToChat({ chatId: chatId, message: newMessage });
            } else {
                if (team) {
                    Object.entries(team.participants).map(([userUid]) => {
                        updateLatestChats({ userUid: userUid, chatUid: channelId, message: { ...newMessage, isChat: isChat, teamId: teamId, channelId: channelId } });
                        if (userUid !== currUser.uid) {
                            updateUserNotifications({ userUid: userUid, notificationUid: newMessage.uid, notification: { ...newMessage, isSeen: false, teamId: teamId, channelId: channelId, isChat: isChat } })
                        }

                    })
                }

                addMessageToChannel({ teamId: teamId, channelId: channelId, message: newMessage });
            }

            setMessage("");
        }

        if (isBot && !isImage) {
            const updatedMessagesForAI = [
                ...messagesForAI,
                { "role": "system", "content": "You are Mimir, a wise being from Norse mythology. You're known for your wisdom, knowledge, and eloquence. Speak as such." },
                { role: 'user', content: content }
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
                const e = error as Error;
                toast({
                    title: "An error occurred.",
                    description: e.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
    };

    return handleSend;
};