import React from "react";
import ActivityCard from "./ActivityCard";

const ActivityList = ({ statusTitle, status, activities }) => {
  return (
    <div className="flex flex-col items-center h-full bg-[#404473] rounded-lg shadow border-3 border-black">
      <h2 className="text-lg font-semibold my-3 text-white text-center">
        {statusTitle}
      </h2>
      <div className="w-full justify-center flex-wrap flex  p-4 space-y-4">
        {activities.length > 0 ? (
          activities.map((item, index) => (
            <ActivityCard
              key={index}
              company={item.company}
              title={item.title}
              date={item.date_applied}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm py-40">No recent activity</p>
        )}
      </div>
    </div>
  );
};

export default ActivityList;
