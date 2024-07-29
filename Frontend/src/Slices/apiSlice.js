import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://chmm-college.onrender.com',
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('jwtToken');
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










