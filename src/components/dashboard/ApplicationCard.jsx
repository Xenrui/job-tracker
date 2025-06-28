import React from "react";

const ApplicationCard = ({ title, count }) => {
  return (
    <div className="bg-[#B39756] flex border-3 justify-center border-black shadow p-4 min-h-[90px] rounded-lg text-black">
      <div className="flex items-center pr-4 border-r-2 border-black">
        <p className="text-2xl font-bold">{count}</p>
      </div>
      <div className="flex items-center pl-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
    </div>
  );
};

export default ApplicationCard;
