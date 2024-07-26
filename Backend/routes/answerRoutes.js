const express = require('express');
const multer = require('multer');
const { PostAnswer,getAnswer } = require('../Controllers/answerController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/', protect, upload.single('file'), PostAnswer);
router.get('/studentanswers',getAnswer)
module.exports = router;
