import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRetrivalStudentsDetailsQuery, } from '../Slices/userApiSlice'; // Adjust the import path as needed

const FeesTable = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const studentId = userInfo?.studentId;
  console.log(studentId);

  const { data: students, isLoading, isError } = useRetrivalStudentsDetailsQuery(studentId);


  useEffect(() => {
    if (!userInfo) {
      navigate('/parent-login');
    }
  }, [userInfo, navigate]);

  const handleGetDetail = (student) => {
    const { studentId, libraryFees, ptaFund, semesterFees, computerLabFees } = student;
    const url = `/Parent/parent-fees-form/${studentId}?libraryFees=${libraryFees}&ptaFund=${ptaFund}&semesterFees=${semesterFees}&computerLabFees=${computerLabFees}`;
    navigate(url);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching student details.</p>;

  if (!students || students.length === 0) {
    return <p>No students found.</p>;
  }

  return (
    <div className='p-3'>
      <h1 className='m-3 text-xl text-white font-semibold'>Fee Payment</h1>
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
                Library Fees
              </th>
              <th scope="col" className="px-6 py-3">
                PTA Fund
              </th>
              <th scope="col" className="px-6 py-3">
                Semester Fees
              </th>
              <th scope="col" className="px-6 py-3">
                Computer Lab Fees
              </th>
              <th scope="col" className="px-6 py-3">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {student.studentName || 'N/A'}
                </th>
                <td className="px-6 py-4">
                  {student.studentCourse || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {student.libraryFees || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {student.ptaFund || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {student.semesterFees || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {student.computerLabFees || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {student.totalAmount || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => handleGetDetail(student)}
                    className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeesTable;
