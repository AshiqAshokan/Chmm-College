import React, { useEffect, useState } from 'react';
import { useGetStudentsQuery, useMarkAttendanceMutation } from '../Slices/userApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const StudentAttendance = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!userInfo) {
    navigate('/student-login');
    return null;
  }

  const { data: studentData, isLoading, error } = useGetStudentsQuery();
  const [markAttendanceMutation] = useMarkAttendanceMutation();


  useEffect(() => {
    console.log("Student Data:", studentData);
  }, [studentData]); 

  const handleMarkAttendance = async (userId, status, userType) => {
    try {
      const response = await markAttendanceMutation({ userId, status, userType });
      console.log( "result is: ",response);
      const message = response.data.message;
      // Display the message in a toast notification
      toast.info(message);

    } catch (error) {
      console.error('Error marking attendance:', error);
      toast.error('Failed to mark attendance');
      // Handle error (e.g., show a toast message)
    }
  };
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className='p-3'>
      <h1 className='m-3 text-xl text-white font-semibold'>Attendance</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Course
              </th>
              <th scope="col" className="px-6 py-3">
                Absent
              </th>
              <th scope="col" className="px-6 py-3">
                Present
              </th>
            </tr>
          </thead>
          <tbody>
          {studentData && (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {studentData.name}
              </th>
              <td className="px-6 py-4">
              {studentData.course}
              </td>
              <td className="px-6 py-4">
                <button onClick={() => handleMarkAttendance(studentData._id, 'absent',studentData.userType)} className="relative inline-flex items-center justify-center p-0.5 mt-2 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Absent
                  </span>
                </button>
              </td>
              <td className="px-6 py-4">
                <button onClick={() => handleMarkAttendance(studentData._id, 'present',studentData.userType )}  className="relative inline-flex items-center justify-center p-0.5 mt-2 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Present
                  </span>
                </button>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentAttendance;
