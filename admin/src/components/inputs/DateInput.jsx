
import React from "react";

const DateInput = ({
  name,
  title,
  placeholder,
  disabled = false,
  value,
  onChange,
  error,
  required = false,
  fromToday = false, // New prop to enable only future dates
}) => {
  const handleDateChange = (e) => {
    onChange(e.target.value);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex text-sm flex-col gap-2 w-full">
      <label htmlFor={name} className="font-medium dark:text-gray-300 text-sm">
        {title}
        {required && <span className="text-red-500 ml-1 text-[18px]">*</span>}
      </label>
      <div className="relative w-full">
        <div className="flex items-center">
          <input
            type="date"
            id={name}
            name={name}
            value={value || ''}
            onChange={handleDateChange}
            placeholder={placeholder}
            disabled={disabled}
            min={fromToday ? today : undefined}
            className={`border z-50 w-full rounded-md px-4 py-2 bg-white text-gray-900 dark:bg-[#212529] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-100 ${error ? "border-red-500" : ""}`}
          />
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
};


export default DateInput;
