const express = require('express');
const router = express.Router();
const { addMark,getMarks } = require('../Controllers/MarkController');
const { protect } = require('../middleware/authMiddleware');

router.post('/',addMark)
router.get('/',getMarks)


module.exports = router;