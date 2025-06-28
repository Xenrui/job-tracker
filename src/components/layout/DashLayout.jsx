import React, { useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import HomePanel from "../dashboard/HomePanel";
import ApplicationsPanel from "../dashboard/ApplicationsPanel";

const DashLayout = () => {
  const [view, setView] = useState("home");

  return (
    <div
      className="flex h-screen bg-[#DCDAD3]"
      style={{ backgroundImage: "url('src/assets/bgLogin.png')" }}
    >
      <Sidebar onSelect={setView} active={view} />
      <div className="flex-1 overflow-auto items-center justify-center">
        {view === "home" ? <HomePanel /> : <ApplicationsPanel />}
      </div>
    </div>
  );
};

export default DashLayout;
