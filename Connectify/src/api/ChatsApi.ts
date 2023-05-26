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
        })

    }),
});

export const { useGetChatsQuery, useAddMessageToChatMutation, useGetChatByIdQuery } = chatsApi;
