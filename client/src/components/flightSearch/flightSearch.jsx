import React, { useState } from 'react';
import './flightSearch.css';


const FlightSearchForm = () => {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching flights for:', formData);
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Source</label>
          <input type="text" name="source" placeholder="Enter source" value={formData.source} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Destination</label>
          <input type="text" name="destination" placeholder="Enter destination" value={formData.destination} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Start Date</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>End Date</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
        </div>
        <button type="submit" className="search-button">Search Flights</button>
      </form>
    </div>
  );
};

export default FlightSearchForm;
