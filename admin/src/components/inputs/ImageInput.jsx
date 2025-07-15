import React, { useState, useEffect } from 'react';

const ImageInput = ({
  name,
  title,
  value = null,
  onChange,
  error,
  showPreview = true,
  info,
  maxSize,
  placeholder
}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    if (value) {
      const preview = typeof value === 'string' ? value : URL.createObjectURL(value);
      setPreviewImage(preview);
    } else {
      setPreviewImage(null);
    }
    return () => {
      if (previewImage?.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [value]);

  const handleFileChange = (files) => {
    if (files?.length) {
      const file = files[0];
      if (maxSize && file.size > maxSize) {
        onChange({
          target: {
            name,
            value: null,
            error: `File size exceeds ${maxSize / 1024 / 1024}MB limit`
          }
        });
        return;
      }
      const preview = URL.createObjectURL(file);
      setPreviewImage(preview);
      onChange({
        target: {
          name,
          value: file,
          preview: preview
        }
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleRemoveImage = () => {
    if (previewImage?.startsWith('blob:')) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    onChange({
      target: {
        name,
        value: null
      }
    });
  };

  return (
    <div className="flex flex-col gap-3 text-sm">
      <label className="font-medium dark:text-gray-300">{title}</label>

      {showPreview && previewImage && (
        <div className="relative h-48 w-48 rounded-lg overflow-hidden border">
          <img
            src={previewImage}
            alt={`Preview`}
            className="object-cover h-full w-full"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
          >
            Remove
          </button>
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        className={`border-2 ${isDragOver ? "border-blue-500" : "border-dashed border-gray-300"}
          rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors duration-200`}
      >
        <input
          type="file"
          name={name}
          accept="image/*"
          className="hidden"
          id={`file-input-${name}`}
          onChange={(e) => handleFileChange(e.target.files)}
        />
        <label
          htmlFor={`file-input-${name}`}
          className="w-full h-full flex items-center justify-center"
        >
          <div className="text-center">
            <p className="text-gray-500 mb-2">
              {placeholder || "Drag and drop image here, or click to select"}
            </p>
            <p className="text-xs text-gray-400">
              Click anywhere in this area to select a file
            </p>
          </div>
        </label>
      </div>
      
      {info && <p className="text-gray-500 text-xs">{info}</p>}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default ImageInput;