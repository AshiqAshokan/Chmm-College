import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetTeacherStudentAttendanceQuery } from '../Slices/userApiSlice';

const TeacherStudentAttendance = () => {
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

    const { data: attendanceRecords, error, isLoading } = useGetTeacherStudentAttendanceQuery({ course });

    useEffect(() => {
        console.log("Teacher student data:", attendanceRecords);
    }, [attendanceRecords]);

    return (
        <div className='p-3'>
            <h1 className='m-3 text-xl text-white font-semibold'>Student Attendance</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Course</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan="4" className="text-center">Loading...</td></tr>
                        ) : error ? (
                            <tr><td colSpan="4" className="text-center text-red-500">Error fetching attendance records</td></tr>
                        ) : (
                            attendanceRecords?.map(record => (
                                <tr key={record._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{record.userName}</th>
                                    <td className="px-6 py-4">{record.course}</td>
                                    <td className="px-6 py-4">{record.status}</td>
                                    <td className="px-6 py-4">{new Date(record.timestamp).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TeacherStudentAttendance;
