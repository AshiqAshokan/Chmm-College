const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  marksObtained: {
    type: Number,
    required: true,
  },
  totalMark: {
    type: Number,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
}, {
  timestamps: true,
});

const Mark = mongoose.model('Mark', markSchema);

module.exports = Mark;
