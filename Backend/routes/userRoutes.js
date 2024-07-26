var express = require('express');
const { registerUser, authUser, logoutUser, getUserProfile, updateUserProfile, getStudents ,getTeachers ,getAttendance } = require('../Controllers/userController');
const { protect } = require('../middleware/authMiddleware');
var router = express.Router();

router.post('/',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.get('/officestudents', getStudents);
router.get('/officeteachers', getTeachers);
router.get('/officeteachersattendance', getAttendance);

module.exports = router;
