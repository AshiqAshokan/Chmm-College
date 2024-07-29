import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useGetNotesQuery } from '../Slices/userApiSlice'; // Import the useGetNotesQuery hook


const AddedNotes = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/teacher-login');
    }
  }, [userInfo, navigate]);

  const [notes, setNotes] = useState([]);
  const { data: fetchedNotes, error, isLoading } = useGetNotesQuery();

  useEffect(() => {
    console.log("fetchedNotes data:", fetchedNotes);
}, [fetchedNotes]);

  useEffect(() => {
    if (fetchedNotes) {
      // Filter notes based on logged-in user's ID or any other identifier
      const filteredNotes = fetchedNotes.filter((note) => note.userId === userInfo._id);
      console.log("filteredNotes:",filteredNotes)
      setNotes(filteredNotes);
    }
  }, [fetchedNotes, userInfo]);

  const handleDownload = async (fileUrl) => {
    try {
      // Adjust the file URL path
      const fileName = fileUrl.split('\\').pop();
      const adjustedFilePath = fileUrl.replace(/\\/g, '/');
      const url = `https://chmm-college.onrender.com/${adjustedFilePath}`;
      
      console.log("Downloading from URL:", url); // Log the URL for debugging

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf', // Ensure this is the correct content type
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName); // Set the filename for download

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
      <h1 className='m-3 text-xl text-white font-semibold'>Added Notes</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                SUBJECT
              </th>
              <th scope="col" className="px-6 py-3">
                CHAPTER
              </th>
              <th scope="col" className="px-6 py-3">
                COURSE
              </th>
              <th scope="col" className="px-6 py-3">
                NOTES
              </th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {note.subject}
                </td>
                <td className="px-6 py-4">
                  {note.chapter}
                </td>
                <td className="px-6 py-4">
                  {note.course}
                </td>
                <td className="py-4">
                  <button onClick={() => handleDownload(note.file)} className="relative inline-flex items-center justify-center p-0.5 mb-2 mt-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
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

export default AddedNotes;
