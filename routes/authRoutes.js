const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserSessions } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', registerUser);

router.post('/login', loginUser);
  
router.get('/sessions', auth, getUserSessions);

module.exports = router;
