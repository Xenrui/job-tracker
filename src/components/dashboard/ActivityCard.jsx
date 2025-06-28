import React from "react";

const ActivityCard = ({ status, company, title, date }) => {
  return (
    <div className="w-full sm:w-80 bg-white shadow-md rounded-lg p-4 border-l-7 border-cyan-800">
      <h3 className="text-md text-gray-500 font-medium mb-1">{status}</h3>
      <h2 className="text-lg font-semibold text-gray-800">{company}</h2>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-xs text-gray-500 mt-2">{date}</p>
    </div>
  );
};

export default ActivityCard;
