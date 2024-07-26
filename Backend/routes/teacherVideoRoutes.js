var express = require('express');
const { teacherVideos, getvideo, getVideoPlay,  } = require('../Controllers/teacherVideoController');
const { protect } = require('../middleware/authMiddleware');
var router = express.Router();

router.post('/', protect, teacherVideos);
router.get('/teachervideos', protect, getvideo);
router.get('/videoplay', protect, getVideoPlay);


module.exports = router;