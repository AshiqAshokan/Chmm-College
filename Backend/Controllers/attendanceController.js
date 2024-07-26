const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Student = require('../Models/studentModel');
const Teacher = require('../Models/teacherModel');
const AttendanceModel = require('../Models/AttendanceModel');
const { ObjectId } = mongoose.Types;

const markAttendance = asyncHandler(async (req, res) => {
  try {
    const { userId, status, userType } = req.body;
    console.log('student id is:',userId)
    console.log('student status is:',status)
    console.log('userType  is:',userType)

    if (!userId || !status || !userType) {
      return res.status(400).json({ error: 'User ID, status, and user type are required' });
    }

    const currentTime = new Date();
    const startOfDay = new Date(currentTime.setHours(0, 0, 0, 0));
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const existingRecord = await AttendanceModel.findOne({
      userId: userId,
      timestamp: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    const userDetails = await (userType === 'student' ? Student.findById(userId) : Teacher.findById(userId));
    console.log("Details of Users:",userDetails)
    if (!userDetails) {
      return res.status(404).json({ error: `${userType} not found` });
    }

    if (existingRecord) {
      return res.json({
        message: `Attendance already recorded for ${userDetails.name} today`,
        userName: userDetails.name,
      });
    } else {
      await AttendanceModel.create({
        userId: userId,
        userName: userDetails.name,
        userType: userType,
        status: status,
        course:userDetails.course,
        timestamp: new Date(),
      });

      return res.json({
        message: `Attendance inserted successfully for ${userDetails.name}`,
        userName: userDetails.name,
      });
    }
  } catch (err) {
    console.error('Error updating/inserting attendance:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getAttendance = asyncHandler(async (req, res) => {
  try {
    console.log("hello")
    const userId = req.query.userId
    console.log("user id is :",userId) // Assuming you have the user ID in the request object
    const attendanceRecords = await AttendanceModel.find({ userId });
    res.json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getTeacherStudentAttendance = asyncHandler(async (req, res) => {
  try {
      console.log("Endpoint hit:");
      const { course } = req.params; // Extract the course parameter
      console.log("Course is:", course);

      if (!course) {
          return res.status(400).json({ error: 'Course is required' });
      }

      // Fetch attendance records for students with the specified course
      const attendanceRecords = await AttendanceModel.find({ userType: 'student', course });
      console.log("Attendance records fetched:", attendanceRecords);

      res.json(attendanceRecords);
  } catch (error) {
      console.error('Error fetching attendance:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getTeacherDetails = asyncHandler(async (req, res) => {
  const teacherIdString = req.params.teacherId;
  console.log('Teacher ID String:', teacherIdString);

  try {
    // Convert teacher ID to ObjectId
    const userId = new ObjectId(teacherIdString);
    console.log('Converted Teacher ID:', userId);

    const teacher = await Teacher.findById(userId);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Count documents in attendance collection
    const attendanceCount = await AttendanceModel.countDocuments({ userId: userId });

    res.json({
      name: teacher.name,
      course: teacher.course,
      attendanceCount,
    });
  } catch (error) {
    console.error('Error fetching teacher details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = { markAttendance, getAttendance, getTeacherStudentAttendance,getTeacherDetails } ;
