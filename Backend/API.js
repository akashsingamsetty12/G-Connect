import express from 'express';
import { connect, Schema, model } from 'mongoose';
import { json } from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

// Connect to MongoDB
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Event Schema
const eventSchema = new Schema({
  event: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  place: { type: String, required: true },
  theme: { type: String, required: true },
});

const Event = model('Event', eventSchema);

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
    res.status(500).json({ error: 'Failed to fetch events', details: err.message });
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
    res.status(500).json({ error: 'Failed to add event', details: err.message });
  }
});

// Delete an event
app.delete('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully', deletedEvent });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event', details: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
