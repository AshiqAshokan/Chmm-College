var express = require('express');
const { PostComment } = require('../Controllers/CommentController');
const { protect } = require('../middleware/authMiddleware');
var router = express.Router();

router.post('/comments',PostComment )





module.exports = router;
