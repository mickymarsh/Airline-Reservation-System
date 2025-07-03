import React from 'react';
import UserNavBar from '../../components/userNavBar/userNavBar.jsx';
import FlightSearchForm from '../../components/flightSearch/flightSearch.jsx';
import './flightBooking.css';

const FlightBooking = () => {
  return (
    <div className="flight-booking">
      <UserNavBar />
      <div className="hero">
        <FlightSearchForm />
      </div>
    </div>
  );
};

export default FlightBooking;
