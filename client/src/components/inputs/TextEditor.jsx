import React, { useRef, useCallback, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "/public/css/TextEditor.css"; // Optional CSS for styling

const TextEditor = ({ value, onEditorChange }) => {
  const quillRef = useRef(null); // Using ref to avoid unnecessary re-renders

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (value !== editor.root.innerHTML) {
        editor.root.innerHTML = value || ""; // Set only if it differs
      }
    }
  }, [value]);
  

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],
      ["image", "video"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "bullet",
    "indent",
    "blockquote",
    "code-block",
    "image",
    "video",
    "color",
    "background",
  ];

  const handleChange = useCallback(
    (content) => {
      if (onEditorChange) onEditorChange(content);
    },
    [onEditorChange]
  );

  return (
    <div className="text-editor-container dark:bg-[#212529] dark:text-white">
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Write Product Description..."
      />
    </div>
  );
};

export default TextEditor; 