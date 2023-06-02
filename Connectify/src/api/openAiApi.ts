import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const openaiApi = createApi({
    reducerPath: 'openaiApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.openai.com/v1',
        prepareHeaders: (headers) => {
            headers.set('Authorization', "Bearer " + "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");
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
                    model: 'gpt-3.5-turbo',
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

