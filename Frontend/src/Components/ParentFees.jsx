import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { razorpayKey } from '../Config';
import {useCreatePaymentMutation, useVerifyPaymentMutation, useUpdatePaymentStatusMutation} from '../Slices/userApiSlice';

const ParentFees = () => {
  console.log('Razorpay Key:', razorpayKey);

  const { userInfo } = useSelector((state) => state.auth);
  const { studentId } = useParams();
  const location = useLocation();
  const [libraryFees, setLibraryFees] = useState('');
  const [ptaFund, setPtaFund] = useState('');
  const [semesterFees, setSemesterFees] = useState('');
  const [computerLabFees, setComputerLabFees] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createpayOrder] = useCreatePaymentMutation();
  const [verifypayPayment] = useVerifyPaymentMutation();
  const [transferSalary] =  useUpdatePaymentStatusMutation(); 

  useEffect(() => {
    if (!userInfo) {
      navigate('/parent-login');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setLibraryFees(queryParams.get('libraryFees') || '');
    setPtaFund(queryParams.get('ptaFund') || '');
    setSemesterFees(queryParams.get('semesterFees') || '');
    setComputerLabFees(queryParams.get('computerLabFees') || '');
  }, [location.search]);

  const handleCalculate = () => {
    const total = parseFloat(libraryFees || 0) + parseFloat(ptaFund || 0) + parseFloat(semesterFees || 0) + parseFloat(computerLabFees || 0);
    setTotalAmount(total.toFixed(2)); // Format to 2 decimal places
  };

  const handleTransferSalary = async () => {
    if (!totalAmount) {
      toast.error('Please calculate the total amount first.');
      return;
    }

    setLoading(true);

    try {
      const orderData = await createpayOrder(totalAmount * 100).unwrap(); // Ensure you pass amount in the smallest unit (e.g., paise)
      if (!orderData || !orderData.id) {
        throw new Error('Failed to create payment order');
      }

      const options = {
        key: razorpayKey,// Use environment variable for Razorpay key
        amount: orderData.amount,
        currency: 'INR',
        name: 'Fee Payment',
        description: `Fee for Student ID: ${studentId}`,
        order_id: orderData.id,
        handler: async (response) => {
          try {
            const verifyData = await verifypayPayment(response).unwrap();
            if (verifyData.success) {
              await transferSalary({
                studentId, // Adjust if needed to match your backend schema
                amount: totalAmount,
                orderId: orderData.id,
                transactionId: response.razorpay_payment_id,
              }).unwrap();
              toast.success('Payment successful');
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            toast.error('An error occurred while verifying payment');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: userInfo?.name || 'Parent Name', // Fallback to 'Parent Name' if userInfo is not available
        },
        notes: {
          address: 'CHMM College for Advanced Studies',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating payment order:', error);
      toast.error('An error occurred while initiating the payment');
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  
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
            value={studentId}
            readOnly
          />
        </div>
        <div className="mb-5">
          <label htmlFor="library-fees" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Library Fees</label>
          <input
            type="number"
            id="library-fees"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            value={totalAmount}
            readOnly
          />
        </div>
        <button type="button" onClick={handleCalculate} className="w-full mb-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Calculate Total</button>
        <button type="button" onClick={handleTransferSalary} className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600" disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default ParentFees;
