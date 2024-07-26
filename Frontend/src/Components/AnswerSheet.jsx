import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useGetAnswerQuery } from '../Slices/userApiSlice'; // Rename the hook for fetching answers

const AnswerSheet = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/teacher-login');
    }
  }, [userInfo, navigate]);

  const [answers, setAnswers] = useState([]);
  const { data: fetchedAnswers, error, isLoading } = useGetAnswerQuery(userInfo ? userInfo._id : ''); // Adjust to useGetAnswerQuery

  useEffect(() => {
    console.log("fetchedAnswers data:", fetchedAnswers);
  }, [fetchedAnswers]);

  useEffect(() => {
    if (fetchedAnswers) {
      // Filter answers based on logged-in user's ID or any other identifier
      const filteredAnswers = fetchedAnswers.filter((answer) => answer.teacherId === userInfo._id);
      console.log("filteredAnswers:", filteredAnswers);
      setAnswers(filteredAnswers);
    }
  }, [fetchedAnswers, userInfo]);

  const handleDownload = async (fileUrl) => {
    try {
      const response = await fetch(`http://localhost:7000/${fileUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',  // Adjust content type as needed
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'answer-sheet.pdf'); // Set the filename for download
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      toast.success('Downloading file...');
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Error downloading file');
    }
  };

  return (
    <div className='p-3'>
      <h1 className='m-3 text-xl text-white font-semibold'>Student Answer Sheets</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                STUDENT
              </th>
              <th scope="col" className="px-6 py-3">
                SUBJECT
              </th>
             
              <th scope="col" className="px-6 py-3">
                COURSE
              </th>
              <th scope="col" className="px-6 py-3">
                FILE
              </th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer) => (
              <tr key={answer._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {answer.studentName} {/* Assuming there's a student name field */}
                </td>
                <td className="px-6 py-4">
                  {answer.subject}
                </td>
              
                <td className="px-6 py-4">
                  {answer.course}
                </td>
                <td className="py-4">
                  <button onClick={() => handleDownload(answer.file)} className="relative inline-flex items-center justify-center p-0.5 mb-2 mt-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Download
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnswerSheet;





