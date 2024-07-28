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
// Other routes...

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "__session",
    keys: ["key1"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    path: '/'
  })
);
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
  origin: 'https://chmm-college-1-frontend.onrender.com', // Your frontend URL
  credentials: true,  // Allows cookies and sessions
};
app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/users', userRoutes);
// Other API routes...

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
