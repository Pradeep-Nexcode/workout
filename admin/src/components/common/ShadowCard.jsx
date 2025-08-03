import React from "react";

const ShadowCard = ({ children, className }) => {
  return (
    <div
      className={`shadow-light bg-white dark:bg-[#212529] p-3 rounded-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default ShadowCard;
