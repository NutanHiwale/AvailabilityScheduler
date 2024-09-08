const User = require('../models/User');
const Availability = require('../models/Availability');
const Session = require('../models/Session');

exports.getAllUsersWithAvailability = async (req, res) => {
  try {
    const users = await User.find().select('_id email');
    const userAvailability = await Promise.all(users.map(async (user) => {
      const availability = await Availability.find({ user: user._id });
      return {
        user,
        availability
      };
    }));
    res.json(userAvailability);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Create new session
exports.createSession = async (req, res) => {
  const { userId, startTime, endTime, title, participants } = req.body;

  try {
    const sessions = await Session.find({ participants: userId });
    const conflict = sessions.some(session => 
      (startTime < session.endTime && endTime > session.startTime)
    );

    if (conflict) {
      return res.status(400).json({ msg: 'Session conflicts with existing session' });
    }
    const newSession = new Session({
      title,
      participants,
      startTime,
      endTime
    });

    await newSession.save();
    res.json(newSession);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ participants: req.user.id }).populate('participants', 'email');
    res.json(sessions);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
