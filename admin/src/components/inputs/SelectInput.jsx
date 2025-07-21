import React from "react";
import { Dropdown } from "primereact/dropdown";

const SelectInput = ({
  name,
  title,
  options = [],
  placeholder = "Select an option",
  value,
  onChange,
  error,
}) => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <label htmlFor={name} className="font-medium text-gray-700 dark:text-gray-300">
        {title}
      </label>

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`block w-full border rounded-md px-3 py-2 transition duration-200 dark:bg-[#212529] dark:text-white ease-in-out ${error ? "border-red-500" : "border-gray-300"
            } focus:outline-none appearance-none`} // Remove default styles and arrow
          style={{ backgroundImage: 'none' }} // Remove default background image
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default SelectInput;


// import React from "react";
// import { Dropdown } from "primereact/dropdown";

// const SelectInput = ({
//   name,
//   title,
//   options = [],
//   placeholder = "Select an option",
//   value,
//   onChange,
//   error,
// }) => {
//   return (
//     <div className="flex flex-col gap-2">
//       <label htmlFor={name} className="font-medium text-sm">
//         {title}
//       </label>

//       <Dropdown
//         id={name}
//         name={name}
//         value={value}
//         options={options}
//         onChange={onChange}
//         placeholder={placeholder}
//         className={`border rounded-md ${error ? "border-red-500" : "border-gray-300"}`} // Keep base styles
//         itemTemplate={(option) => (
//           <div className="flex items-center" style={{ fontSize: "14px" }}>
//             {option.label}
//           </div>
//         )}
//         // Set styles to ensure font size is 14px for selected item and dropdown
//         inputStyle={{ fontSize: '14px' }} // For the selected text
//         style={{ outline: 'none', boxShadow: 'none', fontSize: '14px' }} // For dropdown overall
//       />

//       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//     </div>
//   );
// };

// export default SelectInput;
