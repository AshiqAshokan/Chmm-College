// FeesCalculator.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../Slices/authSlice';
import { useGetStudentDetailsQuery } from '../Slices/userApiSlice';
import { usePostFeesMutation } from '../Slices/userApiSlice';
import { toast } from 'react-toastify';

const FeesCalculator = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentCourse, setStudentCourse] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [libraryFees, setLibraryFees] = useState('');
  const [ptaFund, setPtaFund] = useState('');
  const [semesterFees, setSemesterFees] = useState('');
  const [computerLabFees, setComputerLabFees] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const [postFees, { isLoading: isPosting, error: postError }] = usePostFeesMutation();

  useEffect(() => {
    if (!userInfo) {
      navigate('/office-login');
    }
  }, [userInfo, navigate]);

  const { data, error, isLoading: isFetchingStudent } = useGetStudentDetailsQuery(studentId, {
    skip:!studentId,
  });

  const handleGenerate = () => {
    if (error) {
      toast.error('Failed to fetch student details');
      setStudentDetails(null);
    } else if (data) {
      setStudentDetails(data);
      setStudentName(data.name);
      setStudentCourse(data.course);
    }
  };

  const handleCalculate = () => {
    const total = parseFloat(libraryFees || 0) + parseFloat(ptaFund || 0) + parseFloat(semesterFees || 0) + parseFloat(computerLabFees || 0);
    setTotalAmount(total);
  };

  const handleSubmit = async () => {
    try {
      await postFees({
        studentId,
        studentName,
        studentCourse,
        libraryFees,
        ptaFund,
        semesterFees,
        computerLabFees,
        totalAmount,
      }).unwrap();
      toast.success('Fees posted successfully');
    } catch (error) {
      toast.error('Failed to post fees');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 overflow-auto max-h-[90vh]">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Fee Calculator</h2>
      <form>
        <div className="relative mb-5">
          <label htmlFor="student-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student ID</label>
          <input
            type="text"
            id="student-id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-20 p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <button
            type="button"
            className={`absolute right-2 top-12 bg-blue-500 text-white px-2 py-1 text-xs rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 ${isFetchingStudent ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={handleGenerate}
            disabled={isFetchingStudent}
          >
            {isFetchingStudent ? 'Loading...' : 'Generate'}
          </button>
        </div>
        <div className="mb-5">
          <label htmlFor="student-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Name</label>
          <input
            type="text"
            id="student-name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Student Name"
            value={studentDetails ? studentDetails.name : ''}
            readOnly
          />
        </div>
        <div className="mb-5">
          <label htmlFor="student-course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Course</label>
          <input
            type="text"
            id="student-course"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Student Course"
            value={studentDetails ? studentDetails.course : ''}
            readOnly
          />
        </div>
        <div className="mb-5">
          <label htmlFor="library-fees" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Library Fees</label>
          <input
            type="number"
            id="library-fees"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Library Fees"
            value={libraryFees}
            onChange={(e) => setLibraryFees(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="pta-fund" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PTA Fund</label>
          <input
            type="number"
            id="pta-fund"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="PTA Fund"
            value={ptaFund}
            onChange={(e) => setPtaFund(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="semester-fees" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester Fees</label>
          <input
            type="number"
            id="semester-fees"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Semester Fees"
            value={semesterFees}
            onChange={(e) => setSemesterFees(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="computer-lab-fees" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Computer Lab Fees</label>
          <input
            type="number"
            id="computer-lab-fees"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Computer Lab Fees"
            value={computerLabFees}
            onChange={(e) => setComputerLabFees(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="total-amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Amount</label>
          <input
            type="number"
            id="total-amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Total Amount"
            value={totalAmount}
            readOnly
          />
        </div>
        <button
          type="button"
          className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 mb-5"
          onClick={handleCalculate}
        >
          Calculate
        </button>
        <button
          type="button"
          className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300"
          onClick={handleSubmit}
          disabled={isPosting}
        >
          {isPosting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default FeesCalculator;