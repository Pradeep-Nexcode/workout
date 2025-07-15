import React from "react";

const Btn = ({ onClick, className, type , children}) => {
  return (
    <div>
     
      <button
        type={type}
        className={` btn ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Btn;
