import { createApi } from '@reduxjs/toolkit/query/react';
import { get, ref, set, update } from 'firebase/database';
import { database } from '../config/firebaseConfig';

export interface Chat {
    id: string;
    participants: object;
    messages: object;
}
export interface Message {
    id: string;
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
                url: `chats/${chatId}/messages/${message.id}`,
                method: 'update',
                body: message,
            }),
        }),
        addReplyToMessage: builder.mutation<void, { chatId: string; messageId: string; reply: Message }>({
            query: ({ chatId, messageId, reply }) => ({
                url: `chats/${chatId}/messages/${messageId}/replies/${reply.id}`,
                method: 'update',
                body: reply,
            }),
        }),
    }),
});

export const { useGetChatsQuery, useAddMessageToChatMutation, useAddReplyToMessageMutation, useGetChatByIdQuery } = chatsApi;