const express = require('express');
const router = express.Router();
const { handleChat, getChats } = require('../controllers/chatController');
const { createLead, getLeads } = require('../controllers/leadController');
const { login, logout, status } = require('../controllers/authController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// Auth Routes
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.get('/auth/status', status);

// Chat Routes
router.post('/chat', handleChat);
router.get('/chats', ensureAuthenticated, getChats); // Protected for admin

// Lead Routes
router.post('/leads', createLead); // Publicly accessible to submit leads
router.get('/leads', ensureAuthenticated, getLeads); // Protected for admin

module.exports = router;
