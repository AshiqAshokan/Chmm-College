const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'userType' },
  userName: { type: String, required: true },
  userType: { type: String, required: true, enum: ['student', 'Teacher'] },
  status: { type: String, required: true },
  course: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, {
  timestamps: true,
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
