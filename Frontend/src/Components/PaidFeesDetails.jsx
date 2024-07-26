import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFetchFeesDetailsQuery } from '../Slices/userApiSlice';

const PaidFeesDetails = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const studentId = userInfo?.studentId;

    useEffect(() => {
        if (!userInfo) {
          navigate('/parent-login');
        }
    }, [userInfo, navigate]);

    const { data: paidFees, isLoading, isError } = useFetchFeesDetailsQuery(studentId || '');

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading fees details.</div>;

    return (
        <div className='p-3'>
            <h1 className='m-3 text-xl text-white font-semibold'>Paid Fees Details</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Student ID</th>
                            <th scope="col" className="px-6 py-3">Amount</th>
                            <th scope="col" className="px-6 py-3">Order ID</th>
                            <th scope="col" className="px-6 py-3">Transaction ID</th>
                            <th scope="col" className="px-6 py-3">Payment Status</th>
                            <th scope="col" className="px-6 py-3">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paidFees?.map((fee) => (
                            <tr key={fee._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{fee.studentId}</td>
                                <td className="px-6 py-4">{fee.amount}</td>
                                <td className="px-6 py-4">{fee.orderId}</td>
                                <td className="px-6 py-4">{fee.transactionId}</td>
                                <td className="px-6 py-4">{fee.paymentStatus}</td>
                                <td className="px-6 py-4">{new Date(fee.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PaidFeesDetails;
