import React from "react";

const Footer = () => {
  return (
    <div className="px-10 relative py-5 bg-white dark:bg-[#1A1D21]   dark:text-gray-300 w-auto flex items-center justify-between">
      <h2 className=" text-sm">{new Date().getFullYear()} © Shadow Arrow. </h2>

      <div>
        <p className=" text-sm">
          Designed and Developed by
          <a className="mx-1" href="#">Pradeep</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
