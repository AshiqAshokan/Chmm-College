const Razorpay=require('razorpay')
const crypto=require('crypto')
const Transaction=require('../Models/TransactionModel')
const Teacher=require('../Models/teacherModel')

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount,  // amount in the smallest currency unit
            currency: "INR",
            receipt:  crypto.randomBytes(16).toString('hex'),
            payment_capture: 1
            };
            const order = await razorpay.orders.create(options);
            res.json(order);
          }
          catch (error) {
            console.error('Error creating Razorpay order:', error);
            res.status(500).json({ error: 'Internal Server Error' });
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
                    const transaction = await Transaction.findOne({ orderId: razorpay_order_id });
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

    const handleSalaryTransfer = async (req, res) => {
      console.log("Happy anno mwonse")
      const { teacherId, amount, orderId, transactionId, teacherName } = req.body;

      // Log the received data
      console.log("Received data for salary transfer:");
      console.log(`Teacher ID: ${teacherId}`);
      console.log(`Amount: ${amount}`);
      console.log(`Order ID: ${orderId}`);
      console.log(`Transaction ID: ${transactionId}`);
      console.log(`Teacher Name: ${teacherName}`)
              
                try {
                    const transaction = new Transaction({
                        teacherId,
                        teacherName,
                        amount,
                        orderId,
                        transactionId,
                        paymentStatus: 'completed'
                    });
                    await transaction.save();
                    res.status(200).json({ message: 'Transaction saved successfully' });
                } catch (error) {
                    console.error('Error saving transaction:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            };

            const getSalaries = async (req, res) => {
              try {
                const salaries = await Transaction.find().populate('teacherId', 'name').exec();
                const salaryDetails = salaries.map((salary) => ({
                  _id: salary._id,
                  teacherName: salary.teacherId.name,
                  amount: salary.amount,
                  transactionId: salary.transactionId,
                  paymentStatus: salary.paymentStatus,
                  createdAt: salary.createdAt,
                }));
                res.status(200).json(salaryDetails);
              } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
              }
            };

  const getSalaryTeacher =  async (req, res) => {
    try {
      console.log("reached payment ")
        const { teacherId } = req.params;
        const salaries = await Transaction.find({ teacherId:teacherId }); // Fetch salary details for the teacher

        if (!salaries) {
            return res.status(404).json({ message: 'No salary details found.' });
        }

        res.json(salaries);
    } catch (error) {
        console.error('Error fetching salary details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
                

module.exports = {createOrder,handleSalaryTransfer,verifyPayment,getSalaries,getSalaryTeacher}