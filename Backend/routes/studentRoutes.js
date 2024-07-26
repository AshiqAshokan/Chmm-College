var express = require('express');
const { registerStudent, authStudent, logoutStudent, getStudentProfile, updateStudentProfile,getNotes, getStudentVideos, getQuestion, getStudentMarks, getTeacherList,getStudentDetails,getStudentRetrival } = require('../Controllers/studentController');
const { protect } = require('../middleware/authMiddleware');
const { route } = require('./attendanceRoutes');
var router = express.Router();

router.post('/',registerStudent)
router.post('/auth',authStudent)
router.post('/logout',logoutStudent)
router.route('/profile').get(protect,getStudentProfile).put(protect,updateStudentProfile)
router.get('/studentnotes', getNotes); 
router.get('/studentvideo', protect, getStudentVideos);
router.get('/studentquestion', protect, getQuestion);
router.get('/teacherlist/:course', getTeacherList);
router.get('/',getStudentMarks)
router.get('/studentdetails/:studentId', getStudentDetails);
router.get('/retrivelstudents/:studentId', getStudentRetrival);
module.exports = router;
