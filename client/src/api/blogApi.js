import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseApi';

export const blogApi = createApi({
  reducerPath: 'blog',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: '/blog/create-blog',
        method: 'POST',
        body: blogData,
      }),
    }),
    getAllBlogs: builder.query({
      query: (userId) => ({
        url: `/blog/all-posts`,
        method: 'GET',
        params: { userId },
      }),
    }),
  }),
});

export const { useCreateBlogMutation, useGetAllBlogsQuery } = blogApi;
