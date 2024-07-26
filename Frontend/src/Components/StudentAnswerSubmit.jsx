import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { usePostAnswerMutation } from '../Slices/userApiSlice';

const StudentAnswerSubmit = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo ? userInfo._id : null; // Extract userId from userInfo
  const navigate = useNavigate();
  const location = useLocation();

  const examDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  const [timeLeft, setTimeLeft] = useState(examDuration);

  const questionId = location.state?.questionId || ''; // Extract questionId from location state

  useEffect(() => {
    if (!userInfo) {
      navigate('/student-login');
      return;
    }

    if (!questionId) {
      toast.error('Question ID is missing');
      navigate('/Student/Question-Papers');
      return;
    }

    const timerKey = `examStartTime_${userId}_${questionId}`; // Use userId and questionId to create a unique key
    const storedStartTime = localStorage.getItem(timerKey);
    let startTime;

    if (storedStartTime) {
      startTime = new Date(parseInt(storedStartTime, 10));
    } else {
      startTime = new Date();
      localStorage.setItem(timerKey, startTime.getTime().toString());
    }

    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const elapsed = currentTime - startTime;
      const remaining = examDuration - elapsed;

      if (remaining <= 0) {
        clearInterval(intervalId);
        toast.error('Time over!');
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [userInfo, userId, questionId, navigate]);

  const [answerData, setAnswerData] = useState({
    teacherId:location.state?.teacherId || '',
    teacherName: location.state?.teacherName || '',
    studentName: userInfo ? userInfo.name : '',
    subject: location.state?.subject || '',
    course: location.state?.course || '',
    file: null,
    questionId: questionId,
    userId: userId,
  });

  const [postAnswer, { isLoading, isError, error }] = usePostAnswerMutation();

  useEffect(() => {
    if (postAnswer) {
      console.log("Answer data:", postAnswer);
    }
  }, [postAnswer]);

  const handleChange = (e) => {
    setAnswerData({
      ...answerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setAnswerData({
      ...answerData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (timeLeft <= 0) {
      toast.error('Cannot submit after time is over');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('teacherId', answerData.teacherId);
      formData.append('teacherName', answerData.teacherName);
      formData.append('studentName', answerData.studentName);
      formData.append('subject', answerData.subject);
      formData.append('course', answerData.course);
      formData.append('file', answerData.file);
      formData.append('userId', answerData.userId);
      formData.append('questionId', answerData.questionId);

      const response = await postAnswer(formData).unwrap();
      console.log("response", response);
      toast.success('Answer submitted successfully!');
      navigate('/Student/Question-Papers');
    } catch (error) {
      if (error.status === 400 && error.data.message === 'Answer sheet already uploaded') {
        toast.error('Answer sheet already uploaded!');
      } else {
        toast.error('Failed to submit answer!');
      }
    }
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className='p-3'>
      <h1 className='m-3 text-xl text-white font-semibold underline'>Submit Answer</h1>
      <div className="flex items-center justify-center">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form className="py-4 px-9" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="teacherName" className="mb-3 block text-base font-medium text-[#07074D]">
                Teacher Name:
              </label>
              <input
                type="text"
                name="teacherName"
                id="teacherName"
                placeholder="Enter Teacher Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={answerData.teacherName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="studentName" className="mb-3 block text-base font-medium text-[#07074D]">
                Student Name:
              </label>
              <input
                type="text"
                name="studentName"
                id="studentName"
                placeholder="Enter Student Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={answerData.studentName}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="mb-5">
              <label htmlFor="subject" className="mb-3 block text-base font-medium text-[#07074D]">
                Subject:
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Enter Subject"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={answerData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="course" className="mb-3 block text-base font-medium text-[#07074D]">
                Course:
              </label>
              <input
                type="text"
                name="course"
                id="course"
                placeholder="Enter Course"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={answerData.course}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6 pt-4">
              <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                Upload File
              </label>
              <div className="mb-8">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file"
                  className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                >
                  <div>
                    <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                      {answerData.file ? answerData.file.name : 'Drop files here'}
                    </span>
                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                      Or
                    </span>
                    <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                      Browse
                    </span>
                  </div>
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                disabled={isLoading}
              >
                Submit Answer
              </button>
              {isError && <p>Error: {error.message}</p>}
            </div>
            <div>
              <h2 className='text-lg text-red-600'>Time Left: {formatTime(timeLeft)}</h2>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentAnswerSubmit;
