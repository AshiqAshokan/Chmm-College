var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
var connectDB = require('./Config/db');
var { initializeCounter } = require('./utils/initializeCounter');  // Adjust the path as needed

dotenv.config();

console.log('MONGO_URI in app js:', process.env.MONGO_URI);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

connectDB();

var userRoutes = require('./routes/userRoutes');
var studentRoutes = require('./routes/studentRoutes');
var teacherRoutes = require('./routes/teacherRoutes');
var parentRoutes = require('./routes/parentRoutes');
var attendanceRoutes = require('./routes/attendanceRoutes');
var notesroutes = require('./routes/notesRoutes');
var videoroutes = require('./routes/teacherVideoRoutes');
var questionroutes = require('./routes/questionRoutes');
var answerroutes = require('./routes/answerRoutes');
var markroutes = require('./routes/markRoutes');
var messageroutes = require('./routes/TeacherStudentMsgRoutes');
var razorpayroutes=require('./routes/razorpayRoutes')
var feeroutes=require('./routes/feeRoutes')
var commentRoutes=require('./routes/commentRoutes')

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'https://chmm-college-1-frontend.onrender.com',  // Replace with your frontend URL
  credentials: true,  // If you are using cookies or sessions
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/markAttendance', attendanceRoutes);
app.use('/api/notes', notesroutes);
app.use('/api/videos', videoroutes);
app.use('/api/question', questionroutes);
app.use('/api/answer', answerroutes);
app.use('/api/mark', markroutes);
app.use('/api/messages', messageroutes);
app.use('/api/payments', razorpayroutes);
app.use('/api/fees', feeroutes)
app.use('/api/comments', commentRoutes)


app.use(notFound);
app.use(errorHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Initialize the counter when the app starts
initializeCounter().then(() => {
  console.log('Counter initialized');
}).catch(error => {
  console.error('Failed to initialize counter:', error);
});

module.exports = app;
