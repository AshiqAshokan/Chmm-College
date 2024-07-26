import React from 'react';
import { useSelector } from 'react-redux';
import {  useRetrivalStudentsQuery } from '../Slices/userApiSlice'; 
import { useNavigate } from 'react-router-dom';// Import the custom hook for fetching students

const OfficeStudentList = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    if (!userInfo) {
      navigate('/office-login');
      return null;
    }
  const { data: students, error, isLoading } = useRetrivalStudentsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching students: {error.message}</div>;
  }

  return (
    <div className='p-3'>
      <h1 className='m-3 text-xl text-white font-semibold underline'>Student List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Father's Name</th>
              <th scope="col" className="px-6 py-3">Mother's Name</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Address</th>
              <th scope="col" className="px-6 py-3">Course</th>
              <th scope="col" className="px-6 py-3">Gender</th>
              
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.name}</td>
                <td className="px-6 py-4">{student.fatherName}</td>
                <td className="px-6 py-4">{student.motherName}</td>
                <td className="px-6 py-4">{student.phone}</td>
                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4">{student.address}</td>
                <td className="px-6 py-4">{student.course}</td>
                <td className="px-6 py-4">{student.gender}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OfficeStudentList;
