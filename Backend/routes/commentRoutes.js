var express = require('express');
const { PostComment, getComments } = require('../Controllers/CommentController');
const { protect } = require('../middleware/authMiddleware');
var router = express.Router();

router.post('/comments',PostComment )
router.get('/getcomments',getComments )





module.exports = router;
