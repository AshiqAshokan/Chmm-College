const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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
const notesRoutes = require('./routes/notesRoutes');
const videoRoutes = require('./routes/teacherVideoRoutes');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const markRoutes = require('./routes/markRoutes');
const messageRoutes = require('./routes/TeacherStudentMsgRoutes');
const razorpayRoutes = require('./routes/razorpayRoutes');
const feeRoutes = require('./routes/feeRoutes');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
  origin: 'https://chmm-college-1-frontend.onrender.com', // Your frontend URL
  credentials: true,  // Allows cookies and sessions
};
app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// API routes
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/markAttendance', attendanceRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/answer', answerRoutes);
app.use('/api/mark', markRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/payments', razorpayRoutes);
app.use('/api/fees', feeRoutes);

// Static file serving for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/Frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
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
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
