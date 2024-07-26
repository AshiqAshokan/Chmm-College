const mongoose = require('mongoose');
const bcrypt=require('bcryptjs')
const { Schema } = mongoose;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  subject:{
    type:String,
    required:true
  },
  userType:{
    type: String,
    default:'Teacher'
  }
},{
    timestamps: true
});

teacherSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

teacherSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
