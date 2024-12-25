// EventList.js
import React from 'react';
import './EventList.css';

function EventList({ events }) {
  return (
    <div className="event-list">
      <h2>All Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>Event:</strong> {event.event}<br />
            <strong>Date:</strong> {event.date}<br />
            <strong>Time:</strong> {event.time}<br />
            <strong>Place:</strong> {event.place}<br />
            <strong>Theme:</strong> {event.theme}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
