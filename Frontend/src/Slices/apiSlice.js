import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://chmm-college.onrender.com',
  credentials: 'include' 
});
 

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User','Student'],
  endpoints: (builder) => ({}),
});