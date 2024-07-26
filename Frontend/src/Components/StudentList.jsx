import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetStudentListQuery } from '../Slices/userApiSlice';

const StudentList = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [course, setCourse] = useState('');

    useEffect(() => {
        if (userInfo) {
            setCourse(userInfo.course); // Assuming userInfo has a course field
        } else {
            navigate('/teacher-login');
        }
    }, [userInfo, navigate]);

    const { data: students, error, isLoading } =   useGetStudentListQuery({ course });

    useEffect(() => {
        console.log("student data:", students);
    }, [students]);

  return (
    <div className='p-3'>
    <h1 className='m-3 text-xl text-white font-semibold'>Student List</h1>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              NAME
            </th>
            <th scope="col" className="px-6 py-3">
              COURSE
            </th>
            <th scope="col" className="px-6 py-3">
              PHONE
            </th>
            <th scope="col" className="px-6 py-3">
              EMAIL
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.name}</td>
                <td className="px-6 py-4">{student.course}</td>
                <td className="px-6 py-4">{student.phone}</td>
                <td className="px-6 py-4">{student.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default StudentList
