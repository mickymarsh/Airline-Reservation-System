import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
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

  const handleSearch = () => {
    console.log(source_code);
    console.log(destination_code);
    console.log(startDate);
    console.log(endDate);
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

        <Link to="/Dashboard">
          <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-xs">
            Dashboard
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

  
</div>

  );
}

export default Dashboard;