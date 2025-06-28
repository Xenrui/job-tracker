import React from "react";
import { FiCalendar, FiPlus } from "react-icons/fi";

const today = new Date().toLocaleDateString();

const HeaderPanel = ({ onButtonClick, buttonLabel = "Add Job" }) => {
  return (
    <div className="flex justify-between items-center px-8 py-4 shadow border-b-3 mx-10">
      <div className="flex items-center space-x-2 text-gray-700 font-medium">
        <FiCalendar className="w-5 h-5" />
        <span>{today}</span>
      </div>
      <button
        onClick={onButtonClick}
        className="flex items-center space-x-2 bg-[#191B41] rounded-full hover:bg-cyan-700 text-white px-4 py-2 cursor-pointer transition"
      >
        <FiPlus className="w-5 h-5" />
        <span>{buttonLabel}</span>
      </button>
    </div>
  );
};

export default HeaderPanel;
