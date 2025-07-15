import React, { useState, useEffect } from 'react';

const MultipleImageInput = ({
  name,
  title,
  value = [],
  onChange,
  error,
  showPreview = true,
  info,
  maxSize,
  placeholder,
  minImages = 1,
  maxImages = 3,
}) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    // Generate preview URLs for new files
    // const previews = value.map((item) => {
    //   if (typeof item === 'string') return item; // already a URL
    //   if (item instanceof File || item instanceof Blob) {
    //     return URL.createObjectURL(item);
    //   }
    //   return null;
    // });

    console.log(value, 'value')

    const previews = value.map((item) => {
      if (typeof item.url === 'string' && item.url !== '') return item.url; // already a URL
      if (item instanceof File || item instanceof Blob) {
        return URL.createObjectURL(item);
      }
      return null;
    });

    setPreviewImages(previews);

    return () => {
      // Clean up Blob URLs
      previews.forEach((url) => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [value]);

  const handleFileChange = (files) => {
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const validFiles = fileList.filter((file) => {
      if (maxSize && file.size > maxSize) {
        return false;
      }
      return true;
    });

    const newFileList = [...value, ...validFiles].slice(0, maxImages);
    onChange(newFileList);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = value.filter((_, i) => i !== index);
    onChange(updatedImages);
  };

  return (
    <div className="flex flex-col gap-3 text-sm">
      {title && (
        <label className="font-medium dark:text-gray-300" htmlFor={`file-input-${name}`}>
          {title}
        </label>
      )}

      {showPreview && previewImages.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {previewImages.map((preview, index) => (
            <div key={index} className="relative h-48 w-48 rounded-lg overflow-hidden border">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="object-cover h-full w-full"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {value.length < maxImages && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          className={`border-2 ${isDragOver ? 'border-blue-500' : 'border-dashed border-gray-300'
            } rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors duration-200`}
        >
          <input
            type="file"
            id={`file-input-${name}`}
            name={name}
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files)}
          />
          <label
            htmlFor={`file-input-${name}`}
            className="w-full h-full flex items-center justify-center"
          >
            <div className="text-center">
              <p className="text-gray-500 mb-2">
                {placeholder ||
                  `Drag and drop images here, or click to select (${value.length}/${maxImages})`}
              </p>
              <p className="text-xs text-gray-400">
                Click anywhere in this area to select files
              </p>
            </div>
          </label>
        </div>
      )}

      {info && <p className="text-gray-500 text-xs">{info}</p>}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default MultipleImageInput;
