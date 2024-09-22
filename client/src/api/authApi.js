import { setUser, logout } from '../redux/slices/userSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user?.accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log('Sending refresh token');

    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult?.data) {
      const payload = refreshResult.data?.data;

      api.dispatch(setUser(payload));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

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
    getUser: builder.mutation({
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
  useGetUserMutation,
  useGoogleSignUpMutation,
} = authApi;
