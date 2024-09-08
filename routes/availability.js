const express = require('express');
const { addAvailability, getAvailability, updateAvailability, deleteAvailability } = require('../controllers/availabilityController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/add', auth, addAvailability);
router.get('/', auth, getAvailability);
router.put('/update/:id', auth, updateAvailability);
router.delete('/delete/:id', auth, deleteAvailability);

module.exports = router;
