import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFlight } from "../context/Fliightcontext";

function Search() {
  
    const [sourceSuggestions, setSourceSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [source_code, setSource] = useState("");
    const [destination_code, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
  
    const handleChange = async (value, field) => {
  
      console.log('value: ', value)
  
      if (field === "source_code") {
        setSource(value); // Update source_code state
      } else if (field === "destination_code") {
        setDestination(value); // Update destination_code state
      }
  
      if (value.length >= 1) {
        try {
          const response = await fetch(
            `http://localhost:8800/api/search?q=${value}&field=${field}`
          );
          const data = await response.json();
          console.log("API Response:", data);
  
          if (field === "source_code") {
            setSourceSuggestions(data.map(item => item.source_code));
  
          } else if (field === "destination_code") {
            setDestinationSuggestions(data.map(item => item.destination_code));
  
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        if (field === "source_code") {
          setSourceSuggestions([]);
        } else if (field === "destination_code") {
          setDestinationSuggestions([]);
        }
      }
    };
  
    const { setFlightId, setScheduleId, flightId, scheduleId } = useFlight();

    const handleSearch = async () => {
      try {
        console.log("Values:", source_code, destination_code, startDate, endDate);
        const url = `http://localhost:8800/api/getFlightId?source=${source_code}&destination=${destination_code}&startDate=${startDate}&endDate=${endDate}`

        const response = await fetch( url, {
          headers: {"Content-Type": "application/json"}}
        );
        console.log("Fetching URL:", url);

        const data = await response.json();
        console.log("Flight ID:", data.flightId);
        console.log("Schedule ID:", data.scheduleId);
        setFlightId(data.flightId);
        setScheduleId(data.scheduleId);
        console.log("set Flight ID:", flightId);
        console.log("set Schedule ID:", scheduleId);
      } catch (error) {
        console.error("Error fetching flight ID:", error);
      }
    };

  
    return (
      <div className="bg-gray-100 min-h-screen"> {/* Added background color and full screen height */}
    <div className="bg-blue-900 text-white py-2 px-4 w-full shadow-lg">
      <div className="flex justify-between items-center">
        {/* Left Side - Title */}
        <Link to="/"><span className="text-sm font-semibold">MC Airlines</span></Link>
  
        {/* Right Side - Buttons */}
        <div className="flex space-x-2">
          <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-xs">
            Add Booking
          </button>
  
          <Link to="/Login">
            <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-xs">
              Login
            </button>
          </Link>
  
          <Link to="/Register">
            <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-xs">
              Register
            </button>
          </Link>
  
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-xs">
              Home
            </button>
          </Link>
  
          <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md text-xs">
            Settings
          </button>
  
          <Link to="/">
            <button className="bg-black hover:bg-gray-800 px-3 py-1 rounded-md text-xs">
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-35 bg-[url('https://images.pexels.com/photos/2026398/pexels-photo-2026398.jpeg?auto=compress&cs=tinysrgb&w=600')] bg-cover bg-center bg-no-repeat"> 
      <h2 className="text-2xl font-semibold text-center text-white mb-4">Search Flights</h2>
  
      {/* Source Code Input */}
      <div className="mb-4">
        <input
          type="text"
          value={source_code}
          onChange={(e) => handleChange(e.target.value, "source_code")}
          placeholder="Source Code"
          className="w-full p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {sourceSuggestions.length > 0 && (
          <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow-md">
            {sourceSuggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setSource(item);
                  setSourceSuggestions([]); // Clear suggestions after selection
                }}
                className="p-2 hover:bg-indigo-100 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
  
      {/* Destination Code Input */}
      <div className="mb-4">
        <input
          type="text"
          value={destination_code}
          onChange={(e) => handleChange(e.target.value, "destination_code")}
          placeholder="Destination Code"
          className="w-full p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {destinationSuggestions.length > 0 && (
          <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow-md">
            {destinationSuggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setDestination(item);
                  setDestinationSuggestions([]); // Clear suggestions after selection
                }}
                className="p-2 hover:bg-indigo-100 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
  
      {/* Date Inputs */}
      <div className="mb-4 space-x-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
  
      <Link to="/seat">
      <button
        onClick={handleSearch}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-indigo-400" // Adjusted button color to green
      >
        Search Flight
      </button>
      </Link>
    </div>
  </div>
  
    );
}

export default Search;
