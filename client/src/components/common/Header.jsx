 

import React from "react";
import { HiMenuAlt1 } from "react-icons/hi";
// import FullscreenToggle from "../ui/FullscreenToggle";
// import DarkModeToggle from "../ui/DarkModeToggle";
// import Notifications from "../ui/Notifications";

const Header = ({ onToggleSidebar }) => {
  return (
    <div className="w-full headerBg flex border-b px-10 justify-between items-center">
     <div className="headericons cursor-pointer" onClick={onToggleSidebar}>
        <HiMenuAlt1 />
      </div>

      <div className="flex items-center justify-center gap-5">
        {/* <FullscreenToggle /> */}
 
        {/* <DarkModeToggle /> */}
 
 
        <div className="flex items-center gap-3 h-full py-3 px-7 bg-[#E0FBE2] dark:bg-[#31373C]">
          <div>
            <img
              src="https://picsum.photos/seed/picsum/200/200"
              alt="Profile"
              className="w-[40px] rounded-full"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[16px] dark:text-white font-bold">Pradeep</p>
            <p className="text-[14px] text-gray-500 dark:text-gray-300">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
