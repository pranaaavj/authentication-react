import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseApi';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => '/admin/users',
      providesTags: (result) =>
        result?.data?.users
          ? [
              ...result.data.users.map(({ id }) => ({ type: 'Users', id })),
              'Users',
            ]
          : ['Users'],
    }),
    updateUser: builder.mutation({
      query: (userDetails) => {
        console.log(userDetails.formData);
        return {
          url: `/admin/users/${userDetails?.id}`,
          method: 'PATCH',
          body: userDetails?.formData,
        };
      },
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, userId) => [
        { type: 'Users', id: userId },
        'Users',
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminApi;
