import React from 'react';
import { useSelector } from 'react-redux';
import { useRetrivalTeachersAttendanceQuery } from '../Slices/userApiSlice'; 
import { useNavigate } from 'react-router-dom';

const OfficeTeacherAttendance = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    if (!userInfo) {
        navigate('/office-login');
        return null;
    }

    const { data: attendanceData, error, isLoading } = useRetrivalTeachersAttendanceQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching attendance data: {error.message}</div>;
    }

    // Filter attendanceData to only include teachers
    const teacherAttendance = attendanceData.filter(record => record.userType === 'Teacher');

    return (
        <div className='p-3'>
            <h1 className='m-3 text-xl text-white font-semibold underline'>Teacher Attendance List</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="max-h-96 overflow-y-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Course</th>
                                <th scope="col" className="px-6 py-3">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacherAttendance.map(record => (
                                <tr key={record._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{record.userName}</td>
                                    <td className="px-6 py-4">{record.status}</td>
                                    <td className="px-6 py-4">{record.course}</td>
                                    <td className="px-6 py-4">{new Date(record.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OfficeTeacherAttendance;
