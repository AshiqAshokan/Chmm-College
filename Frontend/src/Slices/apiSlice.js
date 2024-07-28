import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ 
  baseUrl: 'https://chmm-college.onrender.com',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage or sessionStorage
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  mode: 'cors',
  credentials: 'include',  // Include credentials in requests
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User','Student'],
  endpoints: (builder) => ({}),
});
