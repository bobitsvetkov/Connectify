// import { createApi } from '@reduxjs/toolkit/query/react';
// import { get, set, update, ref } from 'firebase/database';
// import { database } from '../config/firebaseConfig';

// export interface Team {
//     name: string;
//     owner: string;
//     uid: string;
//     channels: object;
//     participants: object;
//     photoUrl: string;
// }

// export interface Message {
//     uid: string;
//     user: string;
//     content: string;
// }

// export interface Channel {
//     uid: string;
//     name: string;
//     messages: object;
// }

// export const teamsApi = createApi({
//     reducerPath: 'teamsApi',
//     baseQuery: async ({ url, method, body }) => {
//         switch (method) {
//             case 'get':
//                 const response = await get(ref(database, url));
//                 if (response.exists()) {
//                     return { data: response.val() };
//                 } else {
//                     return { data: {} };
//                 }
//             case 'update':
//                 await update(ref(database, url), body);
//                 return { data: body };
//             case 'set':
//                 await set(ref(database, url), body);
//                 return { data: body };
//             default:
//                 throw new Error('Invalid method');
//         }
//     },
//     endpoints: (builder) => ({
//         getTeams: builder.query<{ [key: string]: Team }, void>({
//             query: () => ({ url: 'teams', method: 'get' }),
//         }),
//         createTeam: builder.mutation<Team, Partial<Team>>({
//             query: (newTeam) => ({
//                 url: `teams/${newTeam.uid}`,
//                 method: 'set',
//                 body: newTeam,
//             }),
//         }),
//         addMessageToChannel: builder.mutation<Message, { teamId: string, channelId: string, message: Message }>({
//             query: ({ teamId, channelId, message }) => ({
//                 url: `teams/${teamId}/channels/${channelId}/messages/${message.uid}`,
//                 method: 'update',
//                 body: message,
//             }),
//         }),
//         getChannelMessages: builder.query<{ [key: string]: Message }, { teamId: string, channelId: string }>({
//             query: ({ teamId, channelId }) => ({ url: `teams/${teamId}/channels/${channelId}/messages`, method: 'get' }),
//         }),
//         createChannel: builder.mutation<Channel, { teamId: string, channel: Channel }>({
//             query: ({ teamId, channel }) => ({
//                 url: `teams/${teamId}/channels/${channel.uid}`,
//                 method: 'update',
//                 body: channel,
//             }),
//         }),
//     }),
// });

// export const { useGetTeamsQuery, useCreateTeamMutation, useGetChannelMessagesQuery, useCreateChannelMutation, useAddMessageToChannelMutation } = teamsApi;
