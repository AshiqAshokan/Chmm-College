var express = require('express');
const { createOrder,handleSalaryTransfer,verifyPayment,getSalaries,getSalaryTeacher } = require('../Controllers/razorpayController');
const { protect } = require('../middleware/authMiddleware');
var router = express.Router();

router.post('/order', createOrder);

// Route to verify Razorpay payment
router.post('/verify', verifyPayment);

router.post('/transfer', handleSalaryTransfer);

router.get('/salaries', getSalaries);

router.get('/fetchteachersalary/:teacherId',getSalaryTeacher)

module.exports = router;