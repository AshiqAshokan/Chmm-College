import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetVideosQuery } from '../Slices/userApiSlice';

const AddedVideo = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [initialLoading, setInitialLoading] = useState(true); // State to manage initial loading state

  // Fetch videos using the useGetVideosQuery hook
  const { data, isLoading, error } = useGetVideosQuery(userInfo ? userInfo._id : '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/teacher-login');
    }
  }, [userInfo, navigate]);

  // Log fetched data to console
  useEffect(() => {
    console.log('Fetched videos:', data ? data.videos : []);
    setInitialLoading(false); // Set initial loading state to false when data is fetched
  }, [data]);

  // Handle loading state
  if (isLoading || initialLoading) {
    return <p>Loading...</p>;
  }

  // Handle error state
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Extract videos from data, ensuring data is defined
  const videos = data ? data.videos : [];

  // Render if no videos found
  if (!Array.isArray(videos) || videos.length === 0) {
    return <p className='text-white'>No videos found.</p>;
  }

  // Render the videos table
  return (
    <div className='p-3'>
      <h1 className='m-3 text-xl text-white font-semibold underline'>Added Videos</h1>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-16 py-3'>
                <span className='sr-only'>Image</span>
              </th>
              <th scope='col' className='px-6 py-3'>
                Lesson
              </th>
              <th scope='col' className='px-6 py-3'>
                Course
              </th>
              <th scope='col' className='px-6 py-3'>
                Subject
              </th>
              <th scope='col' className='px-6 py-3'>
                Uploaded By
              </th>
              <th scope='col' className='px-6 py-3'>
                View
              </th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='p-4'>
                  <img src={video.thumbnailUrl} className='w-16 md:w-32 max-w-full max-h-full' alt='Thumbnail' />
                </td>
                <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                  {video.lesson}
                </td>
                <td className='px-6 py-4'>
                  {video.course}
                </td>
                <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                  {video.subject}
                </td>
                <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                  {video.uploaded_by}
                </td>
                <td className='px-6 py-4'>
                  <Link to={`/Teacher/video-screen/${video._id}`} className='mt-2 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                    Play
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddedVideo;
