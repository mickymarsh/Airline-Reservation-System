import { createContext, useContext, useState } from 'react';

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flightId, setFlightId] = useState(null);

  return (
    <FlightContext.Provider value={{ flightId, setFlightId }}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => useContext(FlightContext);