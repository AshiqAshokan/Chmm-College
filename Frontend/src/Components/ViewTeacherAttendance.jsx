import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAttendanceQuery } from '../Slices/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewTeacherAttendance = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const userId = userInfo._id;
    console.log("user id from frontend",userId )
    const navigate = useNavigate();

    if (!userInfo) {
      navigate('/teacher-login');
      return null;
    }
    const { data: attendanceData, isLoading, error } = useGetAttendanceQuery(userId);

    useEffect(() => {
        console.log("Attendance Data:",attendanceData );
      }, [attendanceData]); 

      const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' ' + date.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
      };

  return (
    <div className='p-3'>
        <h1 className='m-3 text-xl text-white font-semibold'>Self Attendance</h1>

   
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" class="px-6 py-3">
                    Time
                </th>
              
            </tr>
        </thead>
        <tbody>
        {attendanceData && attendanceData.map((record) => (
              <tr key={record._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {record.userName}
                </th>
                <td className="px-6 py-4">
                  {record.status}
                </td>
                <td className="px-6 py-4">
                {formatDate(record.timestamp)}
                </td>
              </tr>
            ))}
        
        </tbody>
    </table>
</div>
</div>

  )
}

export default ViewTeacherAttendance
