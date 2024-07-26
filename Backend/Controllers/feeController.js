
const {Fee,FeeTransaction} = require('../Models/FeesModel');
const Student=require('../Models/studentModel')
const Razorpay = require('razorpay');
const crypto = require('crypto');


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const postFees = async (req, res) => {
    console.log("reached")
  const { studentId,studentName, studentCourse,libraryFees, ptaFund, semesterFees, computerLabFees, totalAmount } = req.body;

  try {
    const fee = new Fee({
      studentId,
      studentName,
      studentCourse,
      libraryFees,
      ptaFund,
      semesterFees,
      computerLabFees,
      totalAmount,
    });

    const createdFee = await fee.save();
    res.status(201).json(createdFee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getStudentFeesRetrival = async (req, res) => {
  console.log("Reached on fees");
  const { studentId } = req.params;
  console.log("Student ID:", studentId);

  try {
    // Assuming Fee is the correct model to fetch fee details
    const fees = await Fee.findOne({ studentId: studentId });

    if (!fees) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(fees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  console.log("Reached on create order")
  const { amount } = req.body;
  console.log("Amount received for order:", amount);
  try {
    const options = {
      amount: amount, // Amount in paise
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const verifyPayment = async (req, res) => {
  try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
      const generated_signature = crypto.createHmac('sha256', razorpay.key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');
      if (generated_signature === razorpay_signature) {
          // Verify the payment and update transaction status
          const transaction = await FeeTransaction.findOne({ orderId: razorpay_order_id });
          if (transaction) {
            transaction.transactionId = razorpay_payment_id;
            transaction.paymentStatus = 'completed';
            await transaction.save();
          }
          res.json({ success: true });
        } else {
          res.status(400).json({ success: false, message: 'Signature mismatch' });
        }
      } catch (error) {
        console.error('Error verifying Razorpay payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
const transfer = async (req, res) => {
  const { studentId, amount, orderId, transactionId } = req.body;
  try {
    const transaction = new FeeTransaction({
      studentId,
      amount,
      orderId,
      transactionId,
      paymentStatus: 'success',
    });
    await transaction.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const paidedFees =  async (req, res) => {
  console.log("Reached paid status")
  const { studentId } = req.params;
  console.log(studentId)

  try {
      // Find payment record for the student
      const  paidFees = await FeeTransaction.find({ studentId:studentId });
      res.json(paidFees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  postFees,
  getStudentFeesRetrival,
  createOrder,
  verifyPayment,
  transfer,
  paidedFees,

};
