import React from "react";

const BtnOutline = ({ onClick, className, type , children}) => {
  return (
    <div>
     
      <button
        type={type}
        className={` btnOutline ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default BtnOutline;
