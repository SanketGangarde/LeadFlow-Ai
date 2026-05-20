require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const ConnectMongoStore = require('connect-mongo');
const MongoStore = ConnectMongoStore.default || ConnectMongoStore;
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Passport Config
require('./config/passport')(passport);

// CORS configuration supporting session credentials (dev + production)
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://leadflow-ai-03sa.onrender.com', // Production URL
  process.env.CLIENT_URL  // Optional: override via environment variable
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow same-origin requests (no origin header = server-to-server or same origin)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());

// Express Session Middleware with MongoDB session persistence
app.use(session({
  secret: process.env.SESSION_SECRET || 'leadflow_secret_session_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: false, // Set to true in production over HTTPS
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', apiRoutes);

// Serve React frontend static files
const fs = require('fs');
const clientBuildPath = path.join(__dirname, 'public');
const indexHtmlPath = path.join(clientBuildPath, 'index.html');

console.log('Static files path:', clientBuildPath);
console.log('index.html exists:', fs.existsSync(indexHtmlPath));

if (fs.existsSync(indexHtmlPath)) {
  // Serve assets (JS, CSS, images) from the public folder
  app.use(express.static(clientBuildPath));

  // Catch-all: for any page route, serve index.html (React Router handles it)
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(indexHtmlPath);
  });
} else {
  app.get('/', (req, res) => {
    res.send('LeadFlow AI Backend is running. (Frontend not built yet)');
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
