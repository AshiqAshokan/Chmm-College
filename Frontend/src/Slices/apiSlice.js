import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// Custom baseQuery to include token in headers
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://chmm-college.onrender.com',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token; // Assuming your token is stored in auth slice under userInfo
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Student'],
  endpoints: (builder) => ({}),
});
