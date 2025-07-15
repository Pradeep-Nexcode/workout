import React from "react";
import { TbCurrencyRupee, TbPercentage } from "react-icons/tb";

const TextInputIcon = ({
  name,
  title,
  placeholder,
  value,
  onChange,
  error,
  icon,
}) => {
 
  return (
    <div className="flex text-sm flex-col gap-2">
      <label className="font-medium dark:text-gray-300">{title}</label>

      <div
        className={`flex w-full items-center justify-center border rounded-sm ${
          error ? "border-red-500" : ""
        } `}
      >
        {icon === "price" && (
          <div className="w-3/12 px-3 py-3 bg-gray-300 flex items-center justify-center">
            <TbCurrencyRupee className="" />
          </div>
        )}
        {icon === "discount" && (
          <div className="w-3/12 px-3 py-3 bg-gray-300 flex items-center justify-center">
            <TbPercentage className="" />
          </div>
        )}
        <input
          className={` outline-none w-10/12 px-3 py-2 dark:bg-[#212529] dark:text-white `}
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default TextInputIcon;
