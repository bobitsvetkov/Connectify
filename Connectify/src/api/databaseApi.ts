import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get, ref, set, update } from "firebase/database";
import { database } from "../config/firebaseConfig";

export interface Chat {
  uid: string;
  participants: object;
  messages: object;
}

interface Reaction {
  uid: string;
  emoji: string;
  user: string;
}
export interface Message {
  uid: string;
  user: string;
  content: string;
  type?: "text" | "gif" | "image" | "audio";  
  replies?: { [key: string]: Message };
  reactions?: Reaction[];
  date?: string;
}
export interface Team {
  name: string;
  owner: string;
  uid: string;
  channels: object;
  participants: object;
  photoUrl: string;
}
export interface Channel {
  uid: string;
  name: string;
  messages: object;
}
export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  photoURL: string;
  status: string;
}

export const baseApi = createApi({
  baseQuery: async ({ url, method, body }) => {
    switch (method) {
      case "get":
        const response = await get(ref(database, url));
        if (response.exists()) {
          return { data: response.val() };
        } else {
          return { data: {} };
        }
      case "update":
      case "set":
        await (method === "update" ? update : set)(ref(database, url), body);
        return { data: body };
      default:
        throw new Error("Invalid method");
    }
  },
  endpoints: () => ({}),
});

export const chatsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getChats: builder.query<{ [key: string]: Chat }, void>({
            query: () => ({ url: "chats", method: "get" }),
        }),
        getChatById: builder.query<Chat, string>({
            query: (chatId) => ({ url: `chats/${chatId}`, method: "get" }),
        }),
        addMessageToChat: builder.mutation<
            Message,
            { chatId: string; message: Message }
        >({
            query: ({ chatId, message }) => ({
                url: `chats/${chatId}/messages/${message.uid}`,
                method: "update",
                body: message,
            }),
        }),
        addReplyToMessage: builder.mutation<
            void,
            { chatId: string; messageId: string; reply: Message }
        >({
            query: ({ chatId, messageId, reply }) => ({
                url: `chats/${chatId}/messages/${messageId}/replies/${reply.uid}`,
                method: "update",
                body: reply,
            }),
        }),
        addReactionToMessage: builder.mutation<
            void,
            {
                chatId: string;
                messageId: string;
                reaction: { uid: string; emoji: string; user: string };
            }
        >({
            query: ({ chatId, messageId, reaction }) => ({
                url: `chats/${chatId}/messages/${messageId}/reactions/${reaction.uid}`,
                method: "update",
                body: reaction,
            }),
        }),
        addReactionToReply: builder.mutation<
            void,
            {
                chatId: string;
                messageId: string;
                replyId: string;
                reaction: { uid: string; emoji: string; user: string };
            }
        >({
            query: ({ chatId, messageId, replyId, reaction }) => ({
                url: `chats/${chatId}/messages/${messageId}/replies/${replyId}/reactions/${reaction.uid}`,
                method: "update",
                body: reaction,
            }),
        }),
        removeReactionFromMessage: builder.mutation<
            void,
            { chatId: string; messageId: string; reactionId: string }
        >({
            query: ({ chatId, messageId, reactionId }) => ({
                url: `chats/${chatId}/messages/${messageId}/reactions/${reactionId}`,
                method: "set",
                body: null,
            }),
        }),
        removeMessageFromChat: builder.mutation<
            void,
            { chatId: string; messageId: string }
        >({
            query: ({ chatId, messageId }) => ({
                url: `chats/${chatId}/messages/${messageId}`,
                method: "set",
                body: null,
            }),
        }),
        updateMessageInChat: builder.mutation<
            Message,
            { chatId: string; messageId: string; newMessageContent: string }
        >({
            query: ({ chatId, messageId, newMessageContent }) => ({
                url: `chats/${chatId}/messages/${messageId}/content`,
                method: "set",
                body: newMessageContent,
            }),
        }),
    }),
})

export const teamsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query<{ [key: string]: Team }, void>({
      query: () => ({ url: 'teams', method: 'get' }),
    }),
    getTeamById: builder.query<Team, string>({
      query: (teamId) => ({ url: `teams/${teamId}`, method: 'get' }),
    }),
    getChannelById: builder.query<Channel, { teamId: string, channelId: string }>({
      query: ({ teamId, channelId }) => ({ url: `teams/${teamId}/channels/${channelId}`, method: 'get' }),
    }),
    createTeam: builder.mutation<Team, Partial<Team>>({
      query: (newTeam) => ({
        url: `teams/${newTeam.uid}`,
        method: 'set',
        body: newTeam,
      }),
    }),
    addMessageToChannel: builder.mutation<Message, { teamId: string, channelId: string, message: Message }>({
      query: ({ teamId, channelId, message }) => ({
        url: `teams/${teamId}/channels/${channelId}/messages/${message.uid}`,
        method: 'update',
        body: message,
      }),
    }),
    getChannelMessages: builder.query<{ [key: string]: Message }, { teamId: string, channelId: string }>({
      query: ({ teamId, channelId }) => ({ url: `teams/${teamId}/channels/${channelId}/messages`, method: 'get' }),
    }),
    createChannel: builder.mutation<Channel, { teamId: string, channel: Channel }>({
      query: ({ teamId, channel }) => ({
        url: `teams/${teamId}/channels/${channel.uid}`,
        method: 'set',
        body: channel,
      }),
    }),
    addUserToTeam: builder.mutation<void, { teamId: string, userId: string }>({
      query: ({ teamId, userId }) => ({
        url: `teams/${teamId}/participants`,
        method: 'update',
        body: { [userId]: true },
      }),
    }),
    addReactionToTeamMessage: builder.mutation<void, { teamId: string; channelId: string; messageId: string; reaction: { uid: string, emoji: string, user: string } }>({
      query: ({ teamId, channelId, messageId, reaction }) => ({
          url: `teams/${teamId}/channels/${channelId}/messages/${messageId}/reactions/${reaction.uid}`,
          method: 'update',
          body: reaction,
      }),
  }),

  }),
});

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<{ [key: string]: User }, void>({
      query: () => ({ url: "users", method: "get" }),
    }),
    getUserById: builder.query<User, string>({
      query: (uid) => ({ url: `users/${uid}`, method: "get" }),
    }),
    getLatestChatsById: builder.query<object, string>({
      query: (uid) => ({ url: `users/${uid}/latestChats`, method: "get" }),
    }),
    getUserSearchByUsername: builder.query<User[], string>({
      query: (username) => ({
        url: "users",
        params: {
          orderBy: "username",
          equalTo: username,
        },
        method: "get",
      }),
    }),
    updateUserStatus: builder.mutation<void, { uid: string; status: string }>({
      query: ({ uid, status }) => ({
        url: `users/${uid}/status`,
        method: "set",
        body: status,
      }),
    }),
    updateUserLatestChats: builder.mutation<void, { userUid: string, chatUid: string, message: object }>({
      query: ({ userUid, chatUid, message }) => ({
        url: `users/${userUid}/latestChats/${chatUid}`,
        method: "set",
        body: message,
      }),
    }),
  }),
});
export const {
    useAddMessageToChatMutation,
    useAddReplyToMessageMutation,
    useGetChatByIdQuery,
    useAddReactionToMessageMutation,
    useAddReactionToReplyMutation,
    useRemoveReactionFromMessageMutation,
    useRemoveMessageFromChatMutation,
    useUpdateMessageInChatMutation,
} = chatsApi;

export const {
  useGetTeamsQuery, useCreateTeamMutation, useAddMessageToChannelMutation, useGetChannelMessagesQuery, useCreateChannelMutation, useGetTeamByIdQuery, useAddUserToTeamMutation, useGetChannelByIdQuery,useAddReactionToTeamMessageMutation
} = teamsApi;

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetUserSearchByUsernameQuery,
  useUpdateUserStatusMutation,
  useUpdateUserLatestChatsMutation,
  useGetLatestChatsByIdQuery
} = usersApi;
