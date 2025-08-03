import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import Header from "./components/common/Header";
 
const RootLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // State to track sidebar collapse

  return (
    <div className="w-full flex h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} />

      <div
        className={`${
          isSidebarCollapsed ? "w-[95%]" : "w-[80%]"
        } flex flex-col`}
      >
        <Header
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <div className="w-full h-full overflow-y-scroll  dark:bg-[#373A40] bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
