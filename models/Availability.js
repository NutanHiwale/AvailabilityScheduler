const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  day: {
    type: String,
    required: true
  },
  timeSlots: [
    {
      startTime: String,
      endTime: String
    }
  ]
});

module.exports = mongoose.model('Availability', AvailabilitySchema);
