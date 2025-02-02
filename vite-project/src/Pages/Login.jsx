import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Login() {

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
          const response = await axios.post("http://localhost:8800/api/Login/login", inputs);
          console.log(response.data); // Log the response data from the API
          console.log("data went successfull")
          navigate("/");
        } catch (err) {
          console.log("Error:", err.response?.data || err); // Log any error response
          setErr(err.response?.data || "An error occurred");
        }
      };

    return (
        <div className="flex justify-center items-center h-screen bg-[url('https://images.pexels.com/photos/2026398/pexels-photo-2026398.jpeg?auto=compress&cs=tinysrgb&w=600')] bg-cover bg-center bg-no-repeat">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 opacity-90">
                <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Login</h1>
                <form>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email address"
                            name="email"
                            onChange={handlechange}
                            className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handlechange}
                            className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {err && <p style={{ color: "red" }}>{err}</p>}
                    <button onClick={handleClick} className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                        Login
                    </button>
                    <div className="mt-4 text-center">
                        <span className="text-gray-600">Don't have an account yet?</span>
                        <Link to="/Register">
                            <button  className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none">
                                Click here to sign up
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
