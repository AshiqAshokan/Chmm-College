const express = require('express');
const router = express.Router();
const { postMessage, getMessages } = require('../Controllers/teacherstudentmsgController');
const { protect } = require('../middleware/authMiddleware');

router.post('/post/:receiverId', protect, postMessage);
router.get('/getmessage/:receiverId/:course',protect,getMessages)

module.exports = router;
