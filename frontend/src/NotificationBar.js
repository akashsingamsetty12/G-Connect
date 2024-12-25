// NotificationBar.js
import React, { useState } from 'react';
import './NotificationBar.css';

function NotificationBar({ date, addEvent }) {
  const [newEvent, setNewEvent] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [theme, setTheme] = useState("");

  const handleAddEvent = () => {
    if (newEvent.trim() && time.trim() && place.trim() && theme.trim()) {
      addEvent({ date: date.toDateString(), event: newEvent, time, place, theme });
      setNewEvent("");
      setTime("");
      setPlace("");
      setTheme("");
    }
  };

  return (
    <div className="notification-bar">
      <h2>Events for {date.toDateString()}</h2>
      <input
        type="text"
        value={newEvent}
        onChange={(e) => setNewEvent(e.target.value)}
        placeholder="Event name"
      />
      <input
        type="text"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Time"
      />
      <input
        type="text"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="Place"
      />
      <input
        type="text"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        placeholder="Theme"
      />
      <button onClick={handleAddEvent}>Add Event</button>
    </div>
  );
}

export default NotificationBar;
