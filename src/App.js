import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CalendarView from './components/CalendarView';
import './App.css';

function App() {
  const [isAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <button 
        className="dark-mode-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/calendar"
            element={
              isAuthenticated ? (
                <CalendarView />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;