// import { createApi } from '@reduxjs/toolkit/query/react';
// import { get, ref } from 'firebase/database';
// import { database } from '../config/firebaseConfig';
// import { User } from '../types/interfaces';



// export const usersApi = createApi({
//     reducerPath: 'usersApi',
//     baseQuery: async ({ url }) => {
//         const response = await get(ref(database, url));
//         if (response.exists()) {
//             return { data: response.val() };
//         } else {
//             throw new Error('No data available');
//         }
//     },
//     endpoints: (builder) => ({
//         getUsers: builder.query<{ [key: string]: User }, void>({
//             query: () => ({ url: 'users' }),
//         }),
//         getUserById: builder.query<User, string>({
//             query: (uid) => ({ url: `users/${uid ? uid : ''}` }),
//         }),
//         getUserSearchByUsername: builder.query<User[], string>({
//             query: (username) => ({
//                 url: 'users',
//                 params: {
//                   orderBy: 'username',
//                   equalTo: username,
//                 },
//             }),
//           }),
//         }),
// });

// export const { useGetUsersQuery, useGetUserByIdQuery ,useGetUserSearchByUsernameQuery} = usersApi;

