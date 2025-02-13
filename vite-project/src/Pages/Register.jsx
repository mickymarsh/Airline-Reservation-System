import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Register() {

    const [inputs, setInputs] = useState({
      username:"",
      email:"",
      password:"",
      name:""
    })

  const handlechange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleClick = async (e) => {
      e.preventDefault(); // Prevent form submission
      console.log("Inputs before sending:", inputs);
    
      try {
        const response = await axios.post("http://localhost:8800/api/Register", inputs);
        console.log(response.data); // Log the response data from the API
        console.log("data went successfull")
        navigate("/Login");
      } catch (err) {
        console.log("Error:", err.response?.data || err); // Log any error response
        setErr(err.response?.data || "An error occurred");
      }
    };



    return (
      <div className="flex justify-center items-center min-h-screen bg-cover bg-center" 
           style={{ backgroundImage: 'url(https://images.pexels.com/photos/1831271/pexels-photo-1831271.jpeg?auto=compress&cs=tinysrgb&w=600)' }}>
        <div className="bg-gray-800 bg-opacity-60 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-blue-400 mb-6 text-center">Register</h1>
          <form action="">
            <div className="mb-4 flex space-x-4">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handlechange}
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Last name"
                  name="last_name"
                  className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handlechange}/>
              </div>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full name"
                name="full_name"
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handlechange}
              />
            </div>
            <div className="mb-4">
              <select
                name="gender"
                onChange={handlechange}
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <input
                type="date"
                placeholder="Date of birth"
                name="dob"
                onChange={handlechange}
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Passport number"
                name="passport_number"
                onChange={handlechange}
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Mobile number"
                name="mobile_num"
                onChange={handlechange}
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email address"
                name="email"
                onChange={handlechange}
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handlechange}
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {err && <p style={{ color: "red" }}>{err}</p>}
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleClick}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Register;
  