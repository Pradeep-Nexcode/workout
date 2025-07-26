import React from "react";

const MinHeader = ({ children, title }) => {
  return (
    <div className="px-10 py-2 bg-white dark:bg-[#1A1D21] w-full flex items-center justify-between">
      <h2 className="uppercase font-semibold dark:text-gray-300">{title}</h2>

      <div>
            {children}
      </div>
    </div>
  );
};

export default MinHeader;
