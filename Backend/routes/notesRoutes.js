const express = require('express');
const multer = require('multer');
const { addNote , getNotes } = require('../Controllers/noteController');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Add a new note
router.post('/', upload.single('file'), addNote);
router.get('/teachernotes', getNotes)

module.exports = router;
