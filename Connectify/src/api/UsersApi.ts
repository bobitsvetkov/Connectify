import { createApi } from '@reduxjs/toolkit/query/react';
import { get, ref } from 'firebase/database';
import { database } from '../config/firebaseConfig';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phoneNumber: string;
    photoURL: string;
}

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: async ({ url }) => {
        const response = await get(ref(database, url));
        if (response.exists()) {
            return { data: response.val() };
        } else {
            throw new Error('No data available');
        }
    },
    endpoints: (builder) => ({
        getUsers: builder.query<{ [key: string]: User }, void>({
            query: () => ({ url: 'users' }),
        }),
    }),
});

export const { useGetUsersQuery } = usersApi;
