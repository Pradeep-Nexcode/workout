import React from 'react';

const DualRangeInput = ({
  title,
  minName,
  maxName,
  min,
  max,
  step,
  minValue,
  maxValue,
  onChange,
  error,
  className = '',
}) => {
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - step);
    onChange({
      target: {
        name: minName,
        value
      }
    });
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + step);
    onChange({
      target: {
        name: maxName,
        value
      }
    });
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium dark:text-gray-300">
          {title}
        </label>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>{minValue}</span>
          <span>-</span>
          <span>{maxValue}</span>
        </div>
      </div>
      <div className="relative pt-5 pb-2">
        <div className="absolute left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded top-7"></div>
        <input
          type="range"
          id={minName}
          name={minName}
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-[3]
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-[3]"
        />
        <input
          type="range"
          id={maxName}
          name={maxName}
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-[4]
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-[4]"
        />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default DualRangeInput;