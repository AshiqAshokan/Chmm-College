import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { usePostQuestionMutation } from '../Slices/userApiSlice'; // Ensure this is the correct hook for posting questions

const QuestionAdding = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo ? userInfo._id : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/teacher-login');
    }
  }, [userInfo, navigate]);

  const [questionData, setQuestionData] = useState({
    subject: userInfo ? userInfo.subject : '',
    name: userInfo ? userInfo.name : '',
    course: userInfo ? userInfo.course : '',
    chapter: '',
    file: null,
  });

  useEffect(() => {
    if (userInfo) {
      setQuestionData((prevQuestionData) => ({
        ...prevQuestionData,
        subject: userInfo.subject,
        course: userInfo.course,
        name: userInfo.name,
      }));
    }
  }, [userInfo]);

  const [postQuestion, { isLoading, isError, error }] = usePostQuestionMutation();

  const handleChange = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setQuestionData({
      ...questionData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Request body:', questionData);
      console.log('User ID:', userId);  
      
      const formData = new FormData();
      formData.append('subject', questionData.subject);
      formData.append('chapter', questionData.chapter);
      formData.append('course', questionData.course);
      formData.append('name', questionData.name); // Append teacher name to form data
      formData.append('file', questionData.file); 
      formData.append('userId', userId);

      const response = await postQuestion(formData).unwrap();
      console.log('Question posted successfully:', response);
      toast.success('Question posted successfully!');
      navigate('/Teacher');
    } catch (error) {
      console.error('Failed to post question:', error);
      toast.error('Failed to post question!');
    }
  };

  return (
    <div className='p-3'>
      <h1 className='m-3 text-xl text-white font-semibold underline'>Question Adding</h1>
      <div className="flex items-center justify-center">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form className="py-4 px-9" onSubmit={handleSubmit}>
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
                value={questionData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="chapter" className="mb-3 block text-base font-medium text-[#07074D]">
                Chapter:
              </label>
              <input
                type="text"
                name="chapter"
                id="chapter"
                placeholder="Enter Chapter"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={questionData.chapter}
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
                value={questionData.course}
                onChange={handleChange}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                Teacher Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Teacher Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={questionData.name}
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
                      {questionData.file ? questionData.file.name : 'Drop files here'}
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
                Post Question
              </button>
              {isError && <p>Error: {error.message}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default QuestionAdding;
