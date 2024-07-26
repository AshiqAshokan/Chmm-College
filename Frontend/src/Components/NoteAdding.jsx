import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { usePostNoteMutation } from '../Slices/userApiSlice'; // Import the usePostNoteMutation hook

const NoteAdding = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const user=userInfo._id
  const navigate = useNavigate();

  

  // Redirect if userInfo is not available
  useEffect(() => {
    if (!userInfo) {
      navigate('/teacher-login');
    }
  }, [userInfo, navigate]);

  // Initialize noteData with default values or from userInfo if available
  const [noteData, setNoteData] = useState({
    subject: userInfo ? userInfo.subject : '',
    chapter: '',
    course: userInfo ? userInfo.course : '',
    file: null, // New state for file
  });

  // Update noteData when userInfo changes
  useEffect(() => {
    if (userInfo) {
      setNoteData((prevNoteData) => ({
        ...prevNoteData,
        subject: userInfo.subject,
        course: userInfo.course,
      }));
    }
  }, [userInfo]);

  const [postNote, { isLoading, isError, error }] = usePostNoteMutation();

  const handleChange = (e) => {
    setNoteData({
      ...noteData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setNoteData({
      ...noteData,
      file: e.target.files[0], // Assuming single file selection
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    console.log('Request body:', noteData);
    console.log('User ID:', user);  
      const formData = new FormData();
      formData.append('subject', noteData.subject);
      formData.append('chapter', noteData.chapter);
      formData.append('course', noteData.course);
      formData.append('file', noteData.file); 
      formData.append('userId', user);
      // Append file to form data

      const response = await postNote(formData).unwrap(); // Use formData in postNote call
      console.log('Note posted successfully:', response);
      navigate('/Teacher')
      
      toast.success('Note posted successfully!');
      // Handle success (show success message, update UI, etc.)
    } catch (error) {
      console.error('Failed to post note:', error);
      toast.error('Failed to post note!');
      // Handle error (show error message, retry logic, etc.)
    }
  };

  return (
    <div className='p-3'>
      <h1 className='m-3 text-xl text-white font-semibold underline'>Notes Adding</h1>
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
                value={noteData.subject}
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
                value={noteData.chapter}
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
                value={noteData.course}
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
                      {noteData.file ? noteData.file.name : 'Drop files here'}
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
                Post Note
              </button>
              {isError && <p>Error: {error.message}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteAdding;
