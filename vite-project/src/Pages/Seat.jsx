import React from 'react';
import { useFlight } from "../context/Fliightcontext";  // Adjust path

const Seat = () => {
  const { flightId } = useFlight();

  return (
    <div>
      <h1>Seat Selection Page</h1>
      <p>Flight ID from context: {flightId ? flightId : "No flight selected"}</p>
      {/* Use flightId for your seat logic */}
    </div>
  );
};

export default Seat;