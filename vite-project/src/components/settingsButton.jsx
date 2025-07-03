import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

function SettingsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (path) => {
    if (currentUser) {
      navigate(path);
    } else {
      navigate("/error");
    }
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-md text-xs"
      >
        Settings
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-28 bg-black border border-gray-200 rounded shadow-md z-50">
          <button
            className="block w-full px-2 py-0.5 text-left text-xs hover:bg-gray-700"
            onClick={() => handleClick("/search")}
          >
            Profile
          </button>
          <button
            className="block w-full px-2 py-0.5 text-left text-xs hover:bg-gray-700"
            onClick={() => handleClick("/history")}
          >
            History
          </button>
        </div>
      )}
    </div>
  );
}

export default SettingsPopup;
