const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the parent schema
const parentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  address: { type: String, required: true },
  course: { type: String, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, default: 'Parent' },
}, {
  timestamps: true,
});

// Method to compare entered password with hashed password
parentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving
parentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Parent = mongoose.model('Parent', parentSchema);
module.exports = Parent;
