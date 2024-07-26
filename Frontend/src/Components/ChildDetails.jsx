import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetStudentByIdQuery } from '../Slices/userApiSlice'; // Adjust the import path as needed

const ChildDetails = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Assuming parent information contains a studentId
  const studentId = userInfo?.studentId;
  const { data: student, isLoading, error } = useGetStudentByIdQuery(studentId, {
    skip: !studentId,
  });

  if (!userInfo) {
    navigate('/parent-login');
    return null;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading student details</div>;

  return (
    <div className='p-3'>
        <h1 className='m-3 text-xl text-white font-semibold'>Student Details</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Student Name
              </th>
              <th scope="col" className="px-6 py-3">
                Course
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {student?.name}
              </th>
              <td className="px-6 py-4">
                {student?.course}
              </td>
              <td className="px-6 py-4">
                {student?.gender}
              </td>
              <td className="px-6 py-4">
                {student?.phone}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChildDetails;
