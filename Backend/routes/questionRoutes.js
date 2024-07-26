const express = require('express');
const multer = require('multer');
const { postQuestion, getQuestions } = require('../Controllers/questionController');
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

router.post('/', protect, upload.single('file'), postQuestion);
router.get('/teacherquestion',getQuestions)
module.exports = router;
