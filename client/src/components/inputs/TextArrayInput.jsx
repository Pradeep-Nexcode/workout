import React, { useState } from "react";

const TextArrayInput = ({ name, title, value = [], onChange, error }) => {
  const [inputValue, setInputValue] = useState(""); // To handle new keyword input

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      const newValue = [...value, inputValue.trim()];
      onChange(newValue); // Update parent form state
      setInputValue(""); // Reset input field
    }
  };

  const handleDelete = (index) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue); // Update parent form state
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleAdd(); // Add keyword on Enter press
    }
  };

  return (
    <div className="flex text-sm flex-col gap-2">
      <label className="font-medium dark:text-gray-300">{title}</label>

      <div className="flex gap-2">
        <input
          type="text"
          className={`border rounded-sm px-3 py-2 outline-none flex-1 dark:bg-[#212529] dark:text-white ${
            error ? "border-red-500" : ""
          }`}
          placeholder="Enter a keyword and press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-sm"
        >
          Add
        </button>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((item, index) => (
          <div
            key={index}
            className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
          >
            {item}
            <button
              type="button"
              onClick={() => handleDelete(index)}
              className="text-red-500 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextArrayInput;
