var express = require('express');
const { markAttendance, getAttendance, getTeacherStudentAttendance,getTeacherDetails } = require('../Controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');
var router = express.Router();

router.post('/', protect, markAttendance);
router.get('/:userId', protect, getAttendance);
router.get('/studentattendance/:course', getTeacherStudentAttendance);
router.get('/teacherdetails/:teacherId', getTeacherDetails);


module.exports = router;
