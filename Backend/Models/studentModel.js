const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Counter = require('../Models/counterModel');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  course: { type: String, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, default: 'student' },
 
}, {
  timestamps: true,
});

// Method to compare entered password with hashed password
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

studentSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'studentId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.studentId = `S${counter.seq.toString().padStart(6, '0')}`;
    next();
  } catch (error) {
    next(error);
  }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
