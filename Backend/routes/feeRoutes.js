// server/routes/feeRoutes.js
const express = require('express');
const router = express.Router();
const { postFees,getStudentFeesRetrival,createOrder,verifyPayment,transfer, paidedFees,getPaidedfees } = require('../Controllers/feeController');

router.post('/', postFees);
router.get('/feestudent/:studentId', getStudentFeesRetrival);
router.post('/order', createOrder);

// Route to verify Razorpay payment
router.post('/verify', verifyPayment);

router.post('/transfer', transfer);
router.get('/feesdetails/:studentId', paidedFees);
router.get('/ParentPaidFees', getPaidedfees);
module.exports = router;
