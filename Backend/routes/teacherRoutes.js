var express = require('express');
const { registerTeacher, authTeacher, logoutTeacher, getTeacherProfile, updateTeacherProfile, getStudentList,getTeacherList } = require('../Controllers/teacherController');
const { protect } = require('../middleware/authMiddleware');
var router = express.Router();

router.post('/',registerTeacher)
router.post('/auth',authTeacher)
router.post('/logout',logoutTeacher)
router.route('/profile').get(protect,getTeacherProfile).put(protect,updateTeacherProfile)
router.get('/studentlist/:course', getStudentList);
router.get('/teacherscourse/:course', getTeacherList);

module.exports = router;
