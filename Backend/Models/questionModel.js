const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  chapter: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  file: {
    type: String, // URL or path to the uploaded file
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  userType:{
    type: String,
    default:'Question'
  }
}, {
  timestamps: true
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
