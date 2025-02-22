import React from 'react';
import FlightSearch from '../../components/authForm/authForm';
//import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
//,UserNavBar

const FlightBooking = () => {
    const handleSearch = (searchParams) => {
        console.log('Search Parameters:', searchParams);
        // Here you would typically make an API call or update the state to reflect the search results
      };
    
      return (
        <div className="dashboard-container">
          <h1>B Airwayz Dashboard</h1>
          <FlightSearch onSearch={handleSearch} />
        </div>
      );
}

export default FlightBooking;