import React from 'react';
import './adminNavBar.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


const AdminNavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log('Token', token);
        const response = await axios.get('http://localhost:4000/backend/user/getUserName', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('User data', response.data);
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUser();
  }, []); 
  const handleSwitchToPassenger = () => {
    alert('Switching to Passenger View');
    // Add logic to switch to passenger view
  };
  const handleSwitchToStatistics = () => {
    alert('Switching to Statistics View');
    // Add logic to switch to passenger view
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
            <span className="admin-name">{user.first_name}</span>
          ) : (
            <span className="loading">Loading...</span>  // Display "Loading..." or an alternative message
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
