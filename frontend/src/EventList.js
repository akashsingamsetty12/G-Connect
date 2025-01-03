import React from 'react';
import './EventList.css';

function EventList({ events, searchQuery }) {
  const filteredEvents = events.filter(event =>
    event.event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="event-list">
      <h2>All Events</h2>
      <ul>
        {filteredEvents.map((event, index) => (
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
