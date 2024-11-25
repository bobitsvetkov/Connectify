import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
if (!API_KEY) {
    console.error("API key is missing! Please set VITE_OPENAI_API_KEY in your .env file.");
}
export const openaiApi = createApi({
    reducerPath: 'openaiApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.openai.com/v1',
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${API_KEY}`);
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        generateConversation: builder.query({
            query: (messages) => ({
                url: '/chat/completions',
                method: 'POST',
                body: {
                    model: 'gpt-4o-mini',
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 200,
                    top_p: 1,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.6,
                },
            }),
        }),
    }),
});

export const { useLazyGenerateConversationQuery } = openaiApi;

