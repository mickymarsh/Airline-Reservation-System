import { Link, useNavigate } from "react-router-dom";

function Dashboard(){
    return(
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
    )
}

export default Dashboard