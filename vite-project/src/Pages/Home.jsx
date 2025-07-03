import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import React, { useContext } from "react";
import { AuthContext } from "../context/Authcontext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SettingsPopup from "../components/settingsButton.jsx";

const ImageSlider = () => {

  const { logout } = useContext(AuthContext); // Access the logout function from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function to clear currentUser from state and localStorage
    navigate("/"); // Redirect the user to the login page after logging out
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500, // Keeping your original speed
    slidesToShow: 4, // Change this to 4 for 4 images to show at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Keeping original autoplay speed
  };

  const images = [
    "https://images.pexels.com/photos/7310015/pexels-photo-7310015.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/163792/model-planes-airplanes-miniatur-wunderland-hamburg-163792.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/30461578/pexels-photo-30461578/free-photo-of-aerial-view-from-airplane-over-scenic-coastline.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/27125556/pexels-photo-27125556/free-photo-of-empty-seats-on-airplane.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/20060357/pexels-photo-20060357/free-photo-of-stewardess-working-on-airplane.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1716825/pexels-photo-1716825.jpeg?auto=compress&cs=tinysrgb&w=600"
  ];

  return (
    <>
      {/* Navbar with background color */}
<div className="bg-blue-900 text-white py-2 px-4 w-full shadow-lg">
  <div className="flex justify-between items-center">
    {/* Left Side - Title and Admin Link */}
    <div className="flex items-center gap-6"> {/* Added gap for spacing */}
      <Link to="/">
        <span className="text-lg font-bold">MC Airlines</span> {/* Larger and bolder */}
      </Link>
      <Link to="/">
        <span className="text-sm font-semibold opacity-80 hover:opacity-100">
          Are you an admin?
        </span> {/* Smaller and slightly faded */}
      </Link>
    </div>

    {/* Right Side - Buttons */}
    <div className="flex space-x-2">
      <Link to="/Search">
      <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-xs">
        Add Booking
      </button>
      </Link>
      

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


      <SettingsPopup></SettingsPopup>

      <Link to="/">
        <button onClick={handleLogout} className="bg-black hover:bg-gray-800 px-3 py-1 rounded-md text-xs">
          Logout
        </button>
      </Link>
    </div>
  </div>
</div>


      {/* Main Heading Section with Background Color */}
      <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-center py-8" >
        <h1 className="text-4xl font-bold text-white leading-tight">
          Welcome to MC Airlines
        </h1>
      </div>

      {/* Slider Container with subtle background */}
      <div className="slider-container flex justify-center mt-4 bg-gray-100 py-8">
        <Slider {...settings} className="w-[1450px]">
          {images.map((image, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="max-w-[350px] h-[270px] object-cover rounded-lg shadow-lg mx-5"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Info Section */}
<div className="mt-12 px-6 py-8 bg-white rounded-lg shadow-xl max-w-7xl mx-auto">
  <h2 className="text-3xl font-semibold text-blue-900 mb-6 text-center">Why Choose Us?</h2>

  {/* Easy Booking Section */}
  <div className="flex items-center mb-6">
    <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full shadow-md mr-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9l3 3m0 0l-3 3m3-3H7" />
      </svg>
    </div>
    <p className="text-lg text-gray-700">
      Here, you can easily book your flights without even needing to log in. Simply select your desired flight, and you're good to go! Booking with us is seamless, straightforward, and fast.
    </p>
  </div>

  {/* Exclusive Discounts Section */}
  <div className="flex items-center mb-6">
    <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full shadow-md mr-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11v2m0 0v2m0-2h2m-2 0h-2" />
      </svg>
    </div>
    <p className="text-lg text-gray-700">
      Plus, when you register and choose your membership tier, you'll unlock exclusive discounts and offers tailored just for you. These offers will make your journey even more affordable!
    </p>
  </div>

  {/* Personalized Deals Section */}
  <div className="flex items-center mb-6">
    <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full shadow-md mr-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12v2m0 0v2m0-2h2m-2 0h-2" />
      </svg>
    </div>
    <p className="text-lg text-gray-700">
      Enjoy the convenience of personalized deals, priority booking, and early access to promotions. Whether you're a frequent traveler or booking your first trip, our platform ensures a seamless experience with no extra hassle.
    </p>
  </div>

  {/* Tiered Membership & Perks Section */}
  <div className="flex items-center">
    <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full shadow-md mr-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12v2m0 0v2m0-2h2m-2 0h-2" />
      </svg>
    </div>
    <p className="text-lg text-gray-700">
      So, book your next adventure effortlessly, save more with our tiered membership, and enjoy a variety of travel perks. Our mission is to make your journey as enjoyable and affordable as possible!
    </p>
  </div>
</div>


    </>
  );
};

export default ImageSlider;
