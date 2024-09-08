const Session = require('../models/Session');
const Availability = require('../models/Availability');

// Create a session
exports.createSession = async (req, res) => {
    const { title, startTime, endTime, participants } = req.body;
    try {
        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to create a session. only admin can create session' });
        }

        const userAvailability = await Availability.findOne({ user: req.user.id });
        const conflictingSessions = await Session.find({
            $or: [
                { startTime: { $lt: endTime, $gt: startTime } },
                { endTime: { $gt: startTime, $lt: endTime } },
                { participants: { $in: participants } }
            ]
        });

        if (conflictingSessions.length > 0) {
            return res.status(400).json({ msg: 'Time slot conflicts with another session.' });
        }

        // Create and save session
        const session = new Session({ title, startTime, endTime, participants });
        await session.save();
        res.status(201).json(session);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Get all sessions for the logged-in user
exports.getSessions = async (req, res) => {
    try {
        const sessions = await Session.find({ participants: req.user.id }).populate('participants', 'email');
        res.json(sessions);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.updateSession = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update a session. Only admin can update session' });
        }

        const sessionId = req.params.id;
        const { title, startTime, endTime, participants } = req.body;

        const updatedSession = await Session.findByIdAndUpdate(
            sessionId,
            {
                title,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                participants,
            },
            { new: true } 
        );

        if (!updatedSession) {
            return res.status(404).json({ message: 'Session not found.' });
        }

        res.status(200).json({ message: 'Session updated successfully', session: updatedSession });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.deleteSession = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete a session.' });
        }

        const sessionId = req.params.id;

        const deletedSession = await Session.findByIdAndDelete(sessionId);

        if (!deletedSession) {
            return res.status(404).json({ message: 'Session not found.' });
        }

        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};