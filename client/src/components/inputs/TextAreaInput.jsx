import React from "react";

const TextAreaInput = ({
  name,
  title,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="flex text-sm flex-col gap-2">
      <label className="font-medium dark:text-gray-300" >{title}</label>
      <textarea
        rows={5}
        className={`border rounded-sm px-3 py-2 outline-none dark:bg-[#212529] dark:text-white ${
          error ? "border-red-500" : ""
        }`}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default TextAreaInput;
