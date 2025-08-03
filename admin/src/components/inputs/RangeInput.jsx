import React from 'react';

const RangeInput = ({
  title,
  name,
  min,
  max,
  step,
  value,
  onChange,
  error,
  className = '',
  showValue = true
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex justify-between items-center">
        <label htmlFor={name} className="text-sm font-medium dark:text-gray-300">
          {title}
        </label>
        {showValue && (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {value}
          </span>
        )}
      </div>
      <input
        type="range"
        id={name}
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default RangeInput;