import React from 'react';

const CheckboxInput = ({
  title,
  name,
  checked,
  onChange,
  error,
  className = '',
  labelClassName = '',
  disabled = false
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${error ? 'border-red-500' : ''}`}
        />
        <label htmlFor={name} className={` text-sm dark:text-gray-300 ${labelClassName} ${disabled ? 'text-gray-500' : ''}`}>
          {title}
        </label>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CheckboxInput;