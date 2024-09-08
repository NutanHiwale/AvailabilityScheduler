const express = require('express');
const { createSession, getSessions, updateSession, deleteSession } = require('../controllers/sessionController');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a session
router.post('/', auth, createSession);

// Get all sessions for the logged-in user
router.get('/', auth, getSessions);

// Update a session
router.put('/:id', auth, updateSession);

// Delete a session
router.delete('/:id', auth, deleteSession);

module.exports = router;
