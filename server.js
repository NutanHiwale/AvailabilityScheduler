const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const availabilityRoutes = require('./routes/availability');
const sessionRoutes = require('./routes/session'); 
const adminRoutes = require('./routes/admin')
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());
app.use(express.json({ extended: false }));

app.use('/api/auth', authRoutes);
app.use('/api/session', sessionRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/availability', availabilityRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
