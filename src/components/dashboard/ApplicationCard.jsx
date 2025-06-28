import React from "react";

const ApplicationCard = ({ title, count, icon: Icon }) => {
  return (
    <div className="bg-[#B39756] flex border-3 justify-center items-center border-black shadow p-4 min-h-[90px] rounded-lg text-black">
      {/* Icon + Count Section */}
      <div className="flex items-center pr-4 border-r-2 border-black gap-2">
        {Icon && <Icon size={28} />}
        <p className="text-2xl font-bold">{count}</p>
      </div>

      {/* Title Section */}
      <div className="flex items-center pl-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
    </div>
  );
};

export default ApplicationCard;
