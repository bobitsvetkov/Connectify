import { createApi } from '@reduxjs/toolkit/query/react';
import { get, ref, set, update } from 'firebase/database';
import { database } from '../config/firebaseConfig';

export interface Chat {
    uid: string;
    participants: object;
    messages: object;
}
export interface Message {
    uid: string;
    user: string;
    content: string;
    replies?: { [key: string]: Message };
}

export const chatsApi = createApi({
    reducerPath: 'chatsApi',
    baseQuery: async ({ url, method, body }) => {
        switch (method) {
            case 'get':
                const response = await get(ref(database, url));
                if (response.exists()) {
                    return { data: response.val() };
                } else {
                    return { data: {} };
                }
            case 'update':
                await update(ref(database, url), body);
                return { data: body };
            default:
                throw new Error('Invalid method');
        }
    },
    endpoints: (builder) => ({
        getChats: builder.query<{ [key: string]: Chat }, void>({
            query: () => ({ url: 'chats', method: 'get' }),
        }),
        getChatById: builder.query<Chat, string>({
            query: (chatId) => ({ url: `chats/${chatId}`, method: 'get' }),
        }),
        addMessageToChat: builder.mutation<Message, { chatId: string, message: Message }>({
            query: ({ chatId, message }) => ({
                url: `chats/${chatId}/messages/${message.uid}`,
                method: 'update',
                body: message,
            }),
        }),
        addReplyToMessage: builder.mutation<void, { chatId: string; messageId: string; reply: Message }>({
            query: ({ chatId, messageId, reply }) => ({
                url: `chats/${chatId}/messages/${messageId}/replies/${reply.uid}`,
                method: 'update',
                body: reply,
            }),
        }),
        addReactionToMessage: builder.mutation<void, { chatId: string; messageId: string; reaction: { uid: string, emoji: string, user: string } }>({
            query: ({ chatId, messageId, reaction }) => ({
                url: `chats/${chatId}/messages/${messageId}/reactions/${reaction.uid}`,
                method: 'update',
                body: reaction,
            }),
        }),
        addReactionToReply: builder.mutation<void, { chatId: string; messageId: string; replyId: string; reaction: { uid: string, emoji: string, user: string } }>({
            query: ({ chatId, messageId, replyId, reaction }) => ({
                url: `chats/${chatId}/messages/${messageId}/replies/${replyId}/reactions/${reaction.uid}`,
                method: 'update',
                body: reaction,
            }),
        }),
        removeReactionFromMessage: builder.mutation<void, { chatId: string; messageId: string; reactionId: string }>({
            query: ({ chatId, messageId, reactionId }) => ({
                url: `chats/${chatId}/messages/${messageId}/reactions/${reactionId}`,
                method: 'set',
                body: null, // setting to null will remove the reaction in Firebase
            }),
        }),
    }),
});

export const {
    useGetChatsQuery,
    useAddMessageToChatMutation,
    useAddReplyToMessageMutation,
    useGetChatByIdQuery,
    useAddReactionToMessageMutation,
    useAddReactionToReplyMutation, 
    useRemoveReactionFromMessageMutation 
} = chatsApi;