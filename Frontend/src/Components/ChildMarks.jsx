import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  useGetStudentMarkQuery } from '../Slices/userApiSlice'; // Import your API slice

const ChildMarks = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const markId = userInfo?.studentId;

  const { data: marks, isLoading, isError } =  useGetStudentMarkQuery(markId); // Fetch marks data

  useEffect(() => {
    if (marks) {
      console.log('Student Data:',marks);
    }
  }, [marks]);

  if (!userInfo) {
    navigate('/parent-login');
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading marks</div>;
  }

  return (
    <div className='p-3'>
      <h1 className='m-3 text-xl text-white font-semibold'>Added Marks</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Student Name</th>
              <th scope="col" className="px-6 py-3">Student ID</th>
              <th scope="col" className="px-6 py-3">Subject</th>
              <th scope="col" className="px-6 py-3">Course</th>
              <th scope="col" className="px-6 py-3">Marks Obtained</th>
              <th scope="col" className="px-6 py-3">Total Mark</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark) => (
              <tr key={mark._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {mark.studentName}
                </th>
                <td className="px-6 py-4">{mark.studentId}</td>
                <td className="px-6 py-4">{mark.subject}</td>
                <td className="px-6 py-4">{mark.course}</td>
                <td className="px-6 py-4">{mark.marksObtained}</td>
                <td className="px-6 py-4">{mark.totalMark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChildMarks;
