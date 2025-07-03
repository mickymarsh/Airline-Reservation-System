import { Link } from "react-router-dom";
import image from "../assets/image.png";

function Error() {
  return (
    <div className="relative flex justify-center items-center min-h-screen">
      {/* Blurred background using ::before */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-opacity-50"
        style={{
          backgroundImage: `url(${image})`,
          filter: "blur(10px)", // Apply the blur effect
        }}
      ></div>
      <div className="relative bg-white p-12 rounded-lg shadow-lg w-1/2 max-w-2xl ">
        <h2 className="text-3xl font-semibold text-blue-600 mb-4">User Information</h2>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <span className="text-lg text-gray-700 mb-4 block">
          You are currently browsing as a Guest.
        </span>
        <div className="flex justify-between">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Go Home
          </Link>
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
