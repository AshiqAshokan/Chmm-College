// server/models/feeModel.js
const mongoose = require('mongoose');
const { type } = require('os');

const feeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  studentName: { type: String, required: true },
  studentCourse: { type: String, required: true },
  libraryFees: { type: Number, required: true },
  ptaFund: { type: Number, required: true },
  semesterFees: { type: Number, required: true },
  computerLabFees: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  
}, {
  timestamps: true,
});

const feeTransactionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  orderId: { type: String, required: true },
  transactionId: { type: String, required: true },
  paymentStatus: { type: String, enum: ['pending', 'success'], default: 'pending' },
}, { timestamps: true });

const Fee = mongoose.model('Fee', feeSchema);
const FeeTransaction = mongoose.model('FeeTransaction', feeTransactionSchema);

module.exports ={ Fee,FeeTransaction };
