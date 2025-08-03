import React from "react";

const BtnWithIcon = ({ onClick, className, type, text, icon, children }) => {
  return (
    <div>
      {" "}


      <button
        type={type}
        className={`bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 transition duration-300 ease-in-out ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default BtnWithIcon;
