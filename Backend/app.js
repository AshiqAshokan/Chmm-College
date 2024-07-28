const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');

dotenv.config();

console.log('MONGO_URI in app js:', process.env.MONGO_URI);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

connectDB();

const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const parentRoutes = require('./routes/parentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const notesroutes = require('./routes/notesRoutes');
const videoroutes = require('./routes/teacherVideoRoutes');
const questionroutes = require('./routes/questionRoutes');
const answerroutes = require('./routes/answerRoutes');
const markroutes = require('./routes/markRoutes');
const messageroutes = require('./routes/TeacherStudentMsgRoutes');
const razorpayroutes = require('./routes/razorpayRoutes');
const feeroutes = require('./routes/feeRoutes');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "__session",
    keys: ["key1"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    domain: '.onrender.com',
    path: '/'
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'https://chmm-college-1-frontend.onrender.com',  // Replace with your frontend URL
  credentials: true,  // If you are using cookies or sessions
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
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
app.use('/api/fees', feeroutes);

// Static file serving for production



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/Frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend','dist', 'index.html'));
  });

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });
} else {
  // Development route
  app.get('/', (req, res) => res.send("Server is ready"));
}

// Error handling
app.use(notFound);
app.use(errorHandler);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
