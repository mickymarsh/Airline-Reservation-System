import React from 'react';
import { Link } from 'react-router-dom';
import './userNavBar.css';

const UserNavBar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">B Airwayz</h1>
      <div className="nav-links">
        <Link to="../../../../react-vite/src/pages/Home.jsx" className="nav-button">Home</Link>
        <Link to="../../../../react-vite/src/pages/Dashboard.jsx" className="nav-button">Dashboard</Link>
      </div>
    </nav>
  );
};

export default UserNavBar;
