import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useAddMarkMutation } from '../Slices/userApiSlice';

const MarkAdding = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [addMark, { isLoading }] = useAddMarkMutation();

  const initialFormData = {
    studentId: '',
    studentName: '',
    subject: userInfo?.subject || '', // Initialize with userInfo subject if available
    course: userInfo?.course || '', // Initialize with userInfo course if available
    marksObtained: 0, // Initialize as number
    totalMark: 0, // Initialize as number
    teacherId: userInfo ? userInfo._id : '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!userInfo) {
      navigate('/teacher-login');
    } else {
      // Update formData with course and subject from userInfo if available
      setFormData({
        ...initialFormData,
        subject: userInfo.subject || '',
        course: userInfo.course || '',
      });
    }
  }, [userInfo, navigate]); // Include navigate in dependency array if needed

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Convert marksObtained and totalMark to numbers if they are numeric strings
    const newValue = id === 'marksObtained' || id === 'totalMark' ? parseFloat(value) : value;
    setFormData({ ...formData, [id]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addMark(formData).unwrap();
      toast.success('Mark added successfully');
      // Reset the form after successful submission
      setFormData({
        ...initialFormData,
        teacherId: userInfo ? userInfo._id : '',
      });
    } catch (error) {
      toast.error(error.data?.message || 'Failed to add mark');
    }
  };

  return (
    <div className='p-3'>
      <h1 className='m-3 text-xl text-white font-semibold underline'>Mark Adding</h1>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => {
          // Exclude rendering the teacherId field
          if (key === 'teacherId') {
            return null;
          }
          return (
            <div className="mb-5" key={key}>
              <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type={key === 'marksObtained' || key === 'totalMark' ? 'number' : 'text'}
                id={key}
                value={formData[key]}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          );
        })}
        <div className='mb-5'>
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MarkAdding;
