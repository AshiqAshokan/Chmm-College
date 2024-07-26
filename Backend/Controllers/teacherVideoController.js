const asyncHandler = require('express-async-handler');
const Video = require('../Models/teacherVideo');


const teacherVideos = asyncHandler(async (req, res) => {
   
    try {
        const { lesson, course, subject, uploaded_by, thumbnailUrl, videoUrl, userId  } = req.body;
        const newVideo = new Video({ lesson, course, subject, uploaded_by, thumbnailUrl, videoUrl, userId  });
        await newVideo.save();
        res.status(201).json({ message: 'Video added successfully' });
    } catch (error) {
        console.error('Error adding video:', error);
        res.status(500).json({ message: 'Failed to add video' });
    }

})

const getvideo=asyncHandler(async (req, res) => {
    
    try {
        console.log("videoss")
        const userId = req.query.userId;
        console.log("user id is:",userId)
        const videos = await Video.find({ userId });
        res.json({ videos });
      } catch (err) {
        console.error('Error fetching videos:', err);
        res.status(500).json({ error: 'Server error. Could not fetch videos.' });
      }

})

const getVideoPlay = asyncHandler(async (req, res) => {
    try {
      const videoId = req.query.videoId;
      const video = await Video.findById(videoId);
      if (!video) {
        res.status(404).json({ error: 'Video not found' });
        return;
      }
      res.json(video);
    } catch (err) {
      console.error('Error fetching video:', err);
      res.status(500).json({ error: 'Server error. Could not fetch video.' });
    }
  });
  
module.exports ={ teacherVideos, getvideo ,getVideoPlay }