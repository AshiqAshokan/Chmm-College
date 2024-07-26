import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetVideoPlayQuery } from '../Slices/userApiSlice';

const StudentVideoScreen = () => {
    const { videoId } = useParams(); // Get videoId from URL parameters
    const { data: video, isLoading, error } = useGetVideoPlayQuery(videoId);
    const [videoUrl, setVideoUrl] = useState('');
  
    useEffect(() => {
      if (video) {
        // Assuming video object contains a property 'videoUrl' that holds the actual video file URL
        setVideoUrl(video.videoUrl);
      }
    }, [video]);
  
    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    if (!videoUrl) {
      return <p>Video not found.</p>;
    }
  
  return (
    <div>
    <video className="w-full" controls>
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  )
}

export default StudentVideoScreen
