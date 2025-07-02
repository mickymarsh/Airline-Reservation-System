import React from "react";
import "./adminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <button className="dashboard-button">Add Flights</button>
        <button className="dashboard-button">Add Aircrafts</button>
        <button className="dashboard-button">Add Routes</button>
        <button className="dashboard-button">Update Service Date of Aircraft</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
