const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  teacherName: {
    type: String,
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
  file: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;
