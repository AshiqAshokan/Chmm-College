import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetStudentQuestionQuery } from '../Slices/userApiSlice';
import { toast } from 'react-toastify';

const StudentQuestionPapers = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [course, setCourse] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/student-login');
    } else {
      setCourse(userInfo.course); // assuming userInfo contains course information
    }
  }, [userInfo, navigate]);

  const { data: questionPapers, error, isLoading } = useGetStudentQuestionQuery(course);

  useEffect(() => {
    if (questionPapers) {
      console.log("fetchedQuestionPapers data:", questionPapers);
    }
  }, [questionPapers]);

  const handleDownload = async (fileUrl) => {
    try {
      const response = await fetch(`http://localhost:7000/${fileUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf', // Adjust content type as needed
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); // Set the filename for download

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Downloading file...');
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Error downloading file');
    }
  };

  const handleSubmit = (paper) => {
    console.log("paper is",paper)
    navigate('/Student/submit-answer', {
      state: {
        teacherId:paper.userId,        
        teacherName: paper.name,
        subject: paper.subject,
        course: paper.course,
        questionId: paper._id,
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   toast.error('Failed to fetch question papers');
  //   return <div>Error fetching question papers</div>;
  // }

  if (!questionPapers || questionPapers.length === 0) {
    return <div>No question papers available.</div>;
  }

  return (
    <div className='p-3'>
      <h1 className='m-3 text-xl text-white font-semibold'>Question Papers</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">SUBJECT</th>
              <th scope="col" className="px-6 py-3">CHAPTER</th>
              <th scope="col" className="px-6 py-3">COURSE</th>
              <th scope="col" className="px-6 py-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {questionPapers.map((paper) => (
              <tr key={paper.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {paper.subject}
                </th>
                <td className="px-6 py-4">{paper.chapter}</td>
                <td className="px-6 py-4">{paper.course}</td>
                <td className="py-4 ">
                  <button
                    onClick={() => handleDownload(paper.file)}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mt-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Download
                    </span>
                  </button>
                  <button
                    onClick={() => handleSubmit(paper)}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mt-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-500 group-hover:from-green-400 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                       Start Exam
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

export default StudentQuestionPapers;
