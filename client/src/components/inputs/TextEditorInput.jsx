import React from "react";
import TextEditor from "./TextEditor";

const TextEditorInput = ({ name,title, value, onEditorChange, error }) => {
  return (
    <div className="flex text-sm flex-col gap-2">
      <label className="font-medium  dark:text-gray-300">{title}</label>
      <TextEditor value={value} onEditorChange={onEditorChange} />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default TextEditorInput;
