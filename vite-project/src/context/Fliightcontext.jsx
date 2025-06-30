import { createContext, useContext, useState } from 'react';

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flightId, setFlightId] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <FlightContext.Provider value={{ flightId, setFlightId, scheduleId, setScheduleId, selectedSeats, setSelectedSeats }}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => useContext(FlightContext);