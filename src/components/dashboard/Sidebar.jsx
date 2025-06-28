import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";

const Sidebar = ({ onSelect, active = "home" }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className=" hidden md:flex flex-col justify-between w-64 bg-[#191B41] text-white p-6 min-h-screen">
      <div className="flex flex-col items-center w-full">

        {/* Logo/Header */}
        <div className="flex items-center gap-2 my-2">
          <BsCardChecklist size={22} className="text-[#B39756]" />
          <h2 className="text-2xl font-bold montserrat text-[#B39756]">JobHunt</h2>
        </div>

        {/* Line Separator */}
        <div className="line-separator" />

        {/* Welcome Text */}
        <div className="text-m text-[#B39756] font-semibold mt-4 mb-20">
          Welcome, <span className="capitalize">{username}</span>
        </div>

        {/* Menu Items */}
        <ul className="space-y-4 w-full px-6">
          <li
            className={`montserrat text-lg font-bold px-3 py-2 rounded transition cursor-pointer ${
              active === "home"
                ? "bg-[#B39756] text-[#191B41]"
                : "text-[#B39756] hover:text-[#d1c099]"
            }`}
            onClick={() => onSelect("home")}
          >
            <div className="flex items-center gap-2">
              <FaHome size={18} />
              HOME
            </div>
          </li>

          <li
            className={`montserrat text-lg font-bold px-3 py-2 rounded transition cursor-pointer ${
              active === "applications"
                ? "bg-[#B39756] text-[#191B41]"
                : "text-[#B39756] hover:text-[#d1c099]"
            }`}
            onClick={() => onSelect("applications")}
          >
            <div className="flex items-center gap-2">
              <BsCardChecklist size={18} />
              VIEW ALL
            </div>
          </li>
        </ul>

        {/* Bottom Separator */}
        <div className="line-separator mt-90" />
      </div>

      {/* Logout Button */}
      <div className="mb-6 w-full flex justify-center">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#B39756] hover:text-red-400 transition"
        >
          <FaSignOutAlt size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
