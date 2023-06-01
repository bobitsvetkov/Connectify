import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const openaiApi = createApi({
    reducerPath: 'openaiApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.openai.com/v1',
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer "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"`);
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        generateMessage: builder.query({
            query: (message) => ({
                url: 'engines/davinci-codex/completions',
                method: 'POST',
                body: {
                    prompt: message,
                    max_tokens: 60,
                },
            }),
        }),
    }),
});

export const { useGenerateMessageQuery } = openaiApi;
