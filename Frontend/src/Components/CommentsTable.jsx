// src/components/CommentsTable.js
import React, { useEffect } from 'react';
import {  useGetCommentsQuery } from '../Slices/userApiSlice';

const CommentsTable = () => {
  const { data: commentsData, error, isLoading } =  useGetCommentsQuery();

  useEffect(() => {
    if (commentsData) {
      console.log('Comments Data:', commentsData);
    }
  }, [commentsData]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading comments data</p>;

  return (
    <div>
      <h1 className='m-3 text-xl text-white font-semibold'>Comments</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Message</th>
              <th scope="col" className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {commentsData.map((comment) => (
              <tr key={comment._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{comment.name}</td>
                <td className="px-6 py-4">{comment.email}</td>
                <td className="px-6 py-4">{comment.message}</td>
                <td className="px-6 py-4">{new Date(comment.createdAt).toLocaleDateString('en-GB')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentsTable;
