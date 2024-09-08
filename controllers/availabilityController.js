const Availability = require('../models/Availability');

exports.addAvailability = async (req, res) => {
  try {
    const { user, day, timeSlots } = req.body;

    if (!user || !day || !timeSlots) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    const newAvailability = new Availability({ user, day, timeSlots });
    const savedAvailability = await newAvailability.save();
    res.status(201).json(savedAvailability);
  } catch (error) {
    console.error('Error adding availability:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

//get availability
exports.getAvailability = async (req, res) => {
  try {
    const availabilities = await Availability.find().populate('user', ['email']);
    res.status(200).json(availabilities);
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update availability
exports.updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!updates.user || !updates.day || !updates.timeSlots) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    const updatedAvailability = await Availability.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedAvailability) {
      return res.status(404).json({ msg: 'Availability not found' });
    }
    res.status(200).json(updatedAvailability);
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete availability
exports.deleteAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAvailability = await Availability.findByIdAndDelete(id);
    if (!deletedAvailability) {
      return res.status(404).json({ msg: 'Availability not found' });
    }
    res.status(200).json({ msg: 'Availability deleted' });
  } catch (error) {
    console.error('Error deleting availability:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
