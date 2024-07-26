import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetStudentAttendanceQuery } from '../Slices/userApiSlice'; // Adjust the import path as needed

const ChildAttendance = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Assuming parent information contains a studentId
  const attendanceId = userInfo?.studentId;
  const { data: attendance, isLoading, error } = useGetStudentAttendanceQuery(attendanceId, {
    skip: !attendanceId,
  });

  useEffect(() => {
    if (attendance) {
      console.log('Student Data:', attendance);
    }
  }, [attendance]);

  if (!userInfo) {
    navigate('/parent-login');
    return null;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading student details</div>;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' ' + date.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
  };

  return (
    <div className='p-3'>
      <h1 className='m-3 text-xl text-white font-semibold'>Student Attendance</h1>
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
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((item) => (
              <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.userName}
                </td>
                <td className="px-6 py-4">
                  {item.course}
                </td>
                <td className="px-6 py-4">
                  {item.status}
                </td>
                <td className="px-6 py-4">
                  {formatDate(item.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChildAttendance;
