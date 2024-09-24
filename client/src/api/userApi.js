import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseApi';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => ({
        url: `/user/details`,
        method: 'GET',
        params: { id: userId },
      }),
    }),
    updateUser: builder.mutation({
      query: (newUserDetails) => ({
        url: `/user/update/${newUserDetails?.userId}`,
        method: 'POST',
        body: newUserDetails?.formData,
      }),
    }),
  }),
});

export const { useUpdateUserMutation, useGetUserQuery } = userApi;
