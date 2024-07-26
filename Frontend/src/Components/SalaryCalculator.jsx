import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../Slices/authSlice';
import { toast } from 'react-toastify';
import { useGetTeacherDetailsQuery, useCreateRazorpayOrderMutation, useVerifyRazorpayPaymentMutation, useTransferSalaryMutation } from '../Slices/userApiSlice';

const SalaryCalculator = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [teacherId, setTeacherId] = useState('');
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [basicPay, setBasicPay] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/office-login');
    }
  }, [userInfo,  navigate]);
  

  const { data, error, isLoading: isFetchingTeacher } = useGetTeacherDetailsQuery(teacherId, {
    skip: !teacherId,
  });
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [verifyRazorpayPayment] = useVerifyRazorpayPaymentMutation();
  const [transferSalary] = useTransferSalaryMutation();


  const handleGenerate = () => {
    setLoading(true); // Start loading
    if (data) {
      setTeacherDetails(data);
      setLoading(false); // End loading
    } else {
      toast.error('Failed to fetch teacher details');
      setLoading(false); // End loading
    }
  };

  const handleCalculate = () => {
    if (teacherDetails) {
      const attendanceCount = teacherDetails.attendanceCount || 0;
      const pay = parseFloat(basicPay) || 0;
      const calculatedTotalAmount = attendanceCount * pay;
      setTotalAmount(calculatedTotalAmount);
    } else {
      toast.error('Teacher details not available');
    }
  };

  const handleTransferSalary = async () => {
    if (!totalAmount) {
        toast.error('Please calculate the total amount first.');
        return;
    }

    setLoading(true);

    try {
        const orderData = await createRazorpayOrder(totalAmount * 100).unwrap();
        if (!orderData || !orderData.id) {
            throw new Error('Failed to create Razorpay order');
        }

        const options = {
            key: 'rzp_test_OWG25ugZFxUAMK',
            amount: orderData.amount,
            currency: 'INR',
            name: 'Salary Transfer',
            description: `Salary for ${teacherDetails.name}`,
            order_id: orderData.id,
            handler: async (response) => {
                try {
                    const verifyData = await verifyRazorpayPayment(response).unwrap();
                    if (verifyData.success) {
                        await transferSalary({ 
                            teacherId, 
                            teacherName: teacherDetails.name,
                            amount: totalAmount, 
                            orderId: orderData.id, 
                            transactionId:response.razorpay_payment_id
                        }).unwrap(); 
                        dispatch(setCredentials({ ...userInfo, ...verifyData }));
                        toast.success('Salary transferred successfully');
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
                name: userInfo.name,
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
        console.error('Error creating Razorpay order:', error);
        toast.error('An error occurred while initiating the payment');
        setLoading(false);
    }
};


  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 overflow-auto max-h-[90vh]">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Salary Calculator</h2>
      <form>
        <div className="relative mb-5">
          <label htmlFor="teacher-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teacher ID</label>
          <input
            type="text"
            id="teacher-id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-20 p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Teacher ID"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          />
          <button
            type="button"
            className={`absolute right-2 top-12 bg-blue-500 text-white px-2 py-1 text-xs rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={handleGenerate}
            disabled={isFetchingTeacher || loading}
          >
            {loading ? 'Loading...' : 'Generate'}
          </button>
        </div>
        <div className="mb-5">
          <label htmlFor="teacher-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teacher Name</label>
          <input
            type="text"
            id="teacher-name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Teacher Name"
            value={teacherDetails ? teacherDetails.name : ''}
            readOnly
          />
        </div>
        <div className="mb-5">
          <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course</label>
          <input
            type="text"
            id="course"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Course"
            value={teacherDetails ? teacherDetails.course : ''}
            readOnly
          />
        </div>
        <div className="mb-5">
          <label htmlFor="attendance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No of Attendance</label>
          <input
            type="number"
            id="attendance"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="No of Attendance"
            value={teacherDetails ? teacherDetails.attendanceCount : ''}
            readOnly
          />
        </div>
        <div className="mb-5">
          <label htmlFor="basic-pay" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Basic Pay</label>
          <input
            type="number"
            id="basic-pay"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Basic Pay"
            value={basicPay}
            onChange={(e) => setBasicPay(e.target.value)}
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
          className="w-full bg-yellow-500 text-black p-2 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-800 mb-5"
          onClick={handleCalculate}
        >
          Calculate
        </button>
        <button
          type="button"
          className={`w-full bg-yellow-500 text-black p-2 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-800 mb-5 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={handleTransferSalary}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default SalaryCalculator;
