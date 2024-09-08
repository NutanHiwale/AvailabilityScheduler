const express = require('express');
const { getAllUsersWithAvailability, createSession, getUserSessions } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/users/availability', auth, getAllUsersWithAvailability);

router.post('/session', auth, createSession);

router.get('/sessions', auth, getUserSessions);

module.exports = router;
