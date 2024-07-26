import React from 'react';
import { useGetSalaryDetailsQuery } from '../Slices/userApiSlice';

const SalaryCredited = () => {
  const { data: salaryDetails, isLoading, isError } = useGetSalaryDetailsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading salary details</div>;

  // Function to format date to dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="salary-credited p-3">
      <h1 className="m-3 text-xl text-white font-semibold underline">Salary Table</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Teacher Name</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Transaction ID</th>
              <th scope="col" className="px-6 py-3">Payment Status</th>
              <th scope="col" className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {salaryDetails.map((detail) => (
              <tr key={detail._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {detail.teacherName}
                </th>
                <td className="px-6 py-4">{detail.amount}</td>
                <td className="px-6 py-4">{detail.transactionId}</td>
                <td className="px-6 py-4">{detail.paymentStatus}</td>
                <td className="px-6 py-4">{formatDate(detail.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryCredited;
