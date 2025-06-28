import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";

const Sidebar = ({ onSelect, active = "home" }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username"); // Get saved username

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username"); // Clear username from local storage

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="hidden md:flex flex-col justify-between w-64 bg-[#191B41] text-white p-6 min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 mb-7">
          <BsCardChecklist size={22} />
          JobHunt
        </h2>

        {/* Username display */}
        <div className="mb-8 text-m font-medium text-cyan-400">
          Welcome, <span className="capitalize">{username}</span>
        </div>

        <ul className="space-y-2">
          <li
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
              active === "home"
                ? "bg-white text-[#191B41] font-semibold"
                : "hover:bg-white hover:text-[#191B41]"
            }`}
            onClick={() => onSelect("home")}
          >
            <FaHome size={18} />
            Home
          </li>

          <li
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
              active === "applications"
                ? "bg-white text-[#191B41] font-semibold"
                : "hover:bg-white hover:text-[#191B41]"
            }`}
            onClick={() => onSelect("applications")}
          >
            <BsCardChecklist size={18} />
            All Applications
          </li>
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-red-500 mt-10"
        aria-label="Logout"
        type="button"
      >
        <FaSignOutAlt size={18} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
