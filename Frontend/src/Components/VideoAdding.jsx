import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../services/firebase';
import { useAddVideoMutation } from '../Slices/userApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VideoAdding = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // Ensure user is logged in
    useEffect(() => {
        if (!userInfo) {
            navigate('/teacher-login');
        }
    }, [userInfo, navigate]);

    const { course = '', subject = '', name = '', _id: userId = '' } = userInfo || {};

    const [lesson, setLesson] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [video, setVideo] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [thumbnailProgress, setThumbnailProgress] = useState(0);
    const [videoProgress, setVideoProgress] = useState(0);

    const [addVideo, { isLoading, isSuccess }] = useAddVideoMutation();

    const uploadFile = (file, setUrl, setProgress) => {
        return new Promise((resolve, reject) => {
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.error('Upload failed', error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrl(downloadURL);
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validate userId
        if (!userId) {
            toast.error('User ID is missing. Please log in again.');
            return;
        }

        try {
            const thumbnailUpload = thumbnail ? uploadFile(thumbnail, setThumbnailUrl, setThumbnailProgress) : Promise.resolve('');
            const videoUpload = video ? uploadFile(video, setVideoUrl, setVideoProgress) : Promise.resolve('');

            const [thumbnailUrl, videoUrl] = await Promise.all([thumbnailUpload, videoUpload]);

            // Prepare form data to send to backend
            const formData = {
                lesson,
                course,
                subject,
                uploaded_by: name,
                thumbnailUrl,
                videoUrl,
                userId,
            };

            const result = await addVideo(formData).unwrap();
            console.log('Video added successfully:', result);
            toast.success('Video added successfully!');
            navigate('/Teacher');
        } catch (error) {
            console.error('Error adding video:', error);
            toast.error('Error adding video. Please try again.');
        }
    };

    return (
        <div className="p-3">
            <ToastContainer />
            <h1 className="m-3 text-xl text-white font-semibold underline">Video Adding</h1>
            <div className="p-4 sm:p-8 md:p-12 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-5">
                            <label htmlFor="lesson">Lesson</label>
                            <input
                                type="text"
                                id="lesson"
                                value={lesson}
                                onChange={(e) => setLesson(e.target.value)}
                                placeholder="Enter lesson name"
                                className="w-full rounded-md border border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="course">Course</label>
                            <input
                                type="text"
                                id="course"
                                value={course}
                                readOnly
                                className="w-full rounded-md border border-gray-300 py-2 px-4 focus:outline-none"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                readOnly
                                className="w-full rounded-md border border-gray-300 py-2 px-4 focus:outline-none"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="name">Uploaded By</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                readOnly
                                className="w-full rounded-md border border-gray-300 py-2 px-4 focus:outline-none"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="thumbnail">Thumbnail</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setThumbnail(e.target.files[0])}
                                className="w-full mt-5"
                            />
                            {thumbnailProgress > 0 && <p>Uploading thumbnail: {thumbnailProgress}%</p>}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="video">Video Upload</label>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => setVideo(e.target.files[0])}
                                className="w-full mt-5"
                            />
                            {videoProgress > 0 && <p>Uploading video: {videoProgress}%</p>}
                        </div>
                        <button type="submit" className=" mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VideoAdding;
