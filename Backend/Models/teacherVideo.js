const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  lesson: { type: String, required: true },
  course: { type: String, required: true },
  subject: { type: String, required: true },
  uploaded_by: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
},{
    timestamps: true,

});

module.exports = mongoose.model('Video', videoSchema);
