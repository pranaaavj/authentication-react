import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReAuth,
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
    googleSignUp: builder.mutation({
      query: (userDetails) => ({
        url: '/auth/google',
        method: 'POST',
        body: userDetails,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useGoogleSignUpMutation } =
  authApi;
