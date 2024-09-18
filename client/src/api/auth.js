import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (userDetails) => ({
        url: '/auth/signin',
        method: 'POST',
        body: userDetails,
      }),
    }),
    signUp: builder.mutation({
      query: (userDetails) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userDetails,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
