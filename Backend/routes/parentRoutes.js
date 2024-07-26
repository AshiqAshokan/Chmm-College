var express = require('express');
const { authParent, registerParent, logoutParent, getParentProfile, updateParentProfile,getStudentDetails,getStudentAttendance,getStudentMarks,getParentList } = require('../Controllers/parentController');
const { protect } = require('../middleware/authMiddleware');
var router = express.Router();

router.post('/',registerParent)
router.post('/auth',authParent)
router.post('/logout',logoutParent)
router.route('/profile').get(protect,getParentProfile).put(protect,updateParentProfile)
router.get('/:studentId',protect,getStudentDetails)
router.get('/attendance/:attendanceId', protect, getStudentAttendance);
router.get('/marks/:markId', protect, getStudentMarks);
router.get('/parentscourse/:course', getParentList);




module.exports = router;
