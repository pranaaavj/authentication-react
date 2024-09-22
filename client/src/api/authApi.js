import { createApi } from '@reduxjs/toolkit/query';
import { baseQueryWithReAuth } from './baseApi';

export const authApi = createApi({
  reducerPath: 'api',
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
    getHome: builder.mutation({
      query: () => ({
        url: '/user',
        method: 'GET',
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

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetHomeMutation,
  useGoogleSignUpMutation,
} = authApi;
