<<<<<<< HEAD

=======
import React, { useState } from 'react';
import logo from './logo.svg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import NotificationBar from './NotificationBar';
import EventList from './EventList'; // Import the EventList component
>>>>>>> b26b6d6dc4078551204fe18ac4473112b1090a1d

function App() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  return (
<<<<<<< HEAD
    <>
    <div>adfgh</div>
    </>
=======
    <div className="app-container">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="Logo" />
        <h1 className="app-title">Welcome to My Cool App</h1>
      </header>
      <main className="app-main">
        <div>
          <Calendar onChange={setDate} value={date} />
          <NotificationBar date={date} addEvent={addEvent} /> {/* Pass the addEvent function */}
        </div>
        <EventList events={events} /> {/* Display all events */}
        <p className="date-display">Selected Date: {date.toDateString()}</p>
      </main>
    </div>
>>>>>>> b26b6d6dc4078551204fe18ac4473112b1090a1d
  );
}

export default App;
