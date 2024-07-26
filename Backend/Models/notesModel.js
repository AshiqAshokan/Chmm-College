const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  course: { type: String, required: true },
  file: { type: String, required: true },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
}, { timestamps: true });

const Note= mongoose.model('Note', noteSchema);

module.exports = Note;