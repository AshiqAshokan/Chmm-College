// src/components/ParentspaidedFees.js
import React from 'react';
import { useGetParentPaidFeesQuery } from '../Slices/userApiSlice';

const ParentspaidedFees = () => {
  const { data: feesData, error, isLoading } = useGetParentPaidFeesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading fees data</p>;

  return (
    <div>
      <h1 className='m-3 text-xl text-white font-semibold'>Students Paid Fees</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Student ID</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Order ID</th>
              <th scope="col" className="px-6 py-3">Transaction ID</th>
              <th scope="col" className="px-6 py-3">Payment Status</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody>
            {feesData.map((fee) => (
              <tr key={fee._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {fee.studentId}
                </th>
                <td className="px-6 py-4">{fee.amount}</td>
                <td className="px-6 py-4">{fee.orderId}</td>
                <td className="px-6 py-4">{fee.transactionId}</td>
                <td className="px-6 py-4">{fee.paymentStatus}</td>
                <td className="px-6 py-4 text-right">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParentspaidedFees;