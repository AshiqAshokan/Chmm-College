const mongoose = require('mongoose');

const participantsSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ['student', 'Teacher'],
    required: true,
  },
  userReference: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'userType'
  }
});

const participants = mongoose.model('participants', participantsSchema);
module.exports = participants;
