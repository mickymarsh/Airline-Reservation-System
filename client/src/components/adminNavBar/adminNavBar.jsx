import React, { useState, useEffect } from 'react';
import './adminNavBar.css';
import axios from 'axios';

const AdminNavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        const response = await axios.get('http://localhost:4000/backend/user/getUserName', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('User data:', response.data);
        setUser(response.data);  // Ensure response.data has a 'first_name' field
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUser();
  }, []);

  const handleSwitchToPassenger = () => {
    alert('Switching to Passenger View');
  };

  const handleSwitchToStatistics = () => {
    alert('Switching to Statistics View');
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-logo">
        <img src="/assets/Blogo.jpeg" alt="Logo" />
        <span>B Airways</span>
      </div>
      <div className="navbar-actions">
        <button onClick={handleSwitchToPassenger} className="switch-button">
          Switch to Passenger
        </button>
        <button onClick={handleSwitchToStatistics} className="switch-button">
          Switch to Statistics
        </button>
        <div className="admin-profile">
          {user ? (
            <span className="admin-name"><b>{user.first_name}</b> </span>
          ) : (
            <span className="admin-name">Loading...</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
