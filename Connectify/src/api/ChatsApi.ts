import { createApi } from '@reduxjs/toolkit/query/react';
import { get, ref, set, push } from 'firebase/database';
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
            case 'post':
                await set(ref(database, url), body);
                return { data: body };
            case 'put':
                await push(ref(database, url), body);
                return { data: body };
            default:
                throw new Error('Invalid method');
        }
    },
    endpoints: (builder) => ({
        getChats: builder.query<{ [key: string]: Chat }, void>({
            query: () => ({ url: 'chats', method: 'get' }),
        }),
        createChat: builder.mutation<Chat, Partial<Chat>>({
            query: (newChat) => ({ url: `chats/${newChat.id}`, method: 'post', body: newChat }),
        }),
        addMessageToChat: builder.mutation<Message, { chatId: string, message: Message }>({
            query: ({ chatId, message }) => ({
                url: `chats/${chatId}/messages/${message.id}`,
                method: 'post',
                body: message,
            }),
        })

    }),
});

export const { useGetChatsQuery, useCreateChatMutation, useAddMessageToChatMutation } = chatsApi;
