import React, { useState } from 'react';
import logo from './logo.svg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import NotificationBar from './NotificationBar';
import EventList from './EventList';
import SearchBar from './SearchBar'; // Import SearchBar component
import { AuthProvider, useAuth } from './AuthContext'; // Import AuthContext

function App() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <AuthProvider>
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
          <div>
            <SearchBar onSearch={handleSearch} /> {/* Add SearchBar component */}
            <EventList events={events} searchQuery={searchQuery} /> {/* Display all events */}
          </div>
          <p className="date-display">Selected Date: {date.toDateString()}</p>
        </main>
        <AuthButtons /> {/* Move AuthButtons to the bottom */}
      </div>
    </AuthProvider>
  );
}

const AuthButtons = () => {
  const { isAdmin, loginAsAdmin, logout } = useAuth();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAsAdmin(id, password);
  };

  return (
    <div className="auth-buttons">
      {isAdmin ? (
        <button onClick={logout} className="auth-button">Logout</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Admin ID"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="auth-button">Login as Admin</button>
        </form>
      )}
    </div>
  );
};

export default App;
