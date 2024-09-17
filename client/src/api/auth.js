import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
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
