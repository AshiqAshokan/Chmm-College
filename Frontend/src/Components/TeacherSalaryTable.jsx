import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFetchTeacherSalaryQuery } from '../Slices/userApiSlice';

const TeacherSalaryTable = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const teacherId = userInfo?._id;
    console.log(teacherId)

    useEffect(() => {
        if (!userInfo) {
          navigate('/teacher-login');
        }
    }, [userInfo, navigate]);

    const { data: teacherSalary, isLoading, isError } = useFetchTeacherSalaryQuery(teacherId || '');

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading salary details.</div>;

    return (
        <div className='p-3'>
            <h1 className='m-3 text-xl text-white font-semibold'>Paid Salary Details</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Teacher Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Transaction ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Payment Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {teacherSalary.map((salary) => (
                            <tr key={salary._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {salary.teacherName}
                                </td>
                                <td className="px-6 py-4">
                                    Rs {salary.amount}
                                </td>
                                <td className="px-6 py-4">
                                    {salary.transactionId}
                                </td>
                                <td className="px-6 py-4">
                                    {salary.orderId}
                                </td>
                                <td className="px-6 py-4">
                                    {salary.paymentStatus}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(salary.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TeacherSalaryTable;
