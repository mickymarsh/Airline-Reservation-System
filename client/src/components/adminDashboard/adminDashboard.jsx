import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { email } = useParams();

  const handleAddAircraft = () => {
    navigate(`/adminHome/${email}/addAircraft`);
  };

  const handleAddRoutes = () => {
    navigate(`/adminHome/${email}/addRoute`);
  };

  const handleUpdateServiceDate = () => {
    navigate(`/adminHome/${email}/updateAircraftServiceDate`);
  };

  const handleViewStatistics = () => {
    navigate(`/adminHome/${email}/statistics`);
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <button className="dashboard-button">Add Flights</button>
        <button className="dashboard-button" onClick={handleAddAircraft}>Add Aircrafts</button>
        <button className="dashboard-button" onClick={handleAddRoutes}>Add Routes</button>
        <button className="dashboard-button" onClick={handleUpdateServiceDate}>Update Service Date of Aircraft</button>
        <button className="dashboard-button" onClick={handleViewStatistics}>View Statistics</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
