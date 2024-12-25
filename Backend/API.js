const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Event Schema
const eventSchema = new mongoose.Schema({
  event: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  place: { type: String, required: true },
  theme: { type: String, required: true },
});

const Event = mongoose.model('Event', eventSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Event API is running');
});

// Get all events
app.get('/events', async (req, res) => {
  try {
    const { date, searchQuery } = req.query;

    // Apply optional filters
    let filter = {};
    if (date) filter.date = date;
    if (searchQuery) filter.event = { $regex: searchQuery, $options: 'i' };

    const events = await Event.find(filter);
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Add a new event
app.post('/events', async (req, res) => {
  try {
    const { event, date, time, place, theme } = req.body;

    if (!event || !date || !time || !place || !theme) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newEvent = new Event({ event, date, time, place, theme });
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add event' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
