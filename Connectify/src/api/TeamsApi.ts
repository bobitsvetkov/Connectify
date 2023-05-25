import { createApi } from '@reduxjs/toolkit/query/react';
import { get, push, ref, set, update } from 'firebase/database';
import { database } from '../config/firebaseConfig';

export interface Team {
    name: string;
    owner: string;
    id: string;
    participants: object;
    messages: object;
    photoUrl: string;
}
export interface Message {
    id: string;
    user: string;
    content: string;
}

export const teamsApi = createApi({
    reducerPath: 'teamsApi',
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
            case 'set':
                await set(ref(database, url), body);
                return { data: body };
            default:
                throw new Error('Invalid method');
        }
    },
    endpoints: (builder) => ({
        getTeams: builder.query<{ [key: string]: Team }, void>({
            query: () => ({ url: 'teams', method: 'get' }),
        }),
        createTeam: builder.mutation<Team, Partial<Team>>({
            query: (newTeam) => ({
                url: `teams/${newTeam.uid}`,
                method: 'set',
                body: newTeam,
            }),
        }),
        addMessageToTeam: builder.mutation<Message, { teamId: string, message: Message }>({
            query: ({ teamId, message }) => ({
                url: `teams/${teamId}/messages/${message.id}`,
                method: 'update',
                body: message,
            }),
        })

    }),
});

export const { useGetTeamsQuery, useAddMessageToTeamMutation, useCreateTeamMutation } = teamsApi;

