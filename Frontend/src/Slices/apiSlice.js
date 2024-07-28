import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ 
  baseUrl: 'https://chmm-college.onrender.com',
  mode: 'cors',
  credentials: 'include',  // Include credentials in requests
});
 

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User','Student'],
  endpoints: (builder) => ({}),
});