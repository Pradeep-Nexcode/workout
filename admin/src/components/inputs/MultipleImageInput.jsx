import React, { useEffect, useState } from 'react';

const MultipleImageInput = ({
  name,
  title,
  value = [],
  onChange,
  error,
  maxSize = 3 * 1024 * 1024, // 3MB default
  maxImages = 3,
}) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    const previews = [];
    
    (value || []).forEach((item) => {
      if (item?.file) {
        // New file selected
        previews.push(URL.createObjectURL(item.file));
      } else if (item?.url) {
        // Existing image with URL
        previews.push(item.url);
      }
    });

    setPreviewImages(previews);

    // Cleanup blob URLs when component unmounts or value changes
    return () => {
      previews.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [value]);

  const handleFileChange = (files) => {
    if (!files?.length) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => {
      // Check file size
      if (maxSize && file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
        return false;
      }
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} is not a valid image`);
        return false;
      }
      return true;
    });

    // Convert files to the format expected by the form
    const newImages = validFiles.map((file) => ({
      file,
      url: '', // Will be filled when uploading
      altText: ''
    }));

    // Combine with existing images, respecting maxImages limit
    const currentImages = Array.isArray(value) ? value : [];
    const combinedImages = [...currentImages, ...newImages].slice(0, maxImages);

    onChange(combinedImages);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...(value || [])];
    updatedImages.splice(index, 1);
    onChange(updatedImages);
  };

  const handleAltTextChange = (index, altText) => {
    const updatedImages = [...(value || [])];
    updatedImages[index] = { ...updatedImages[index], altText };
    onChange(updatedImages);
  };

  const currentImageCount = (value || []).length;

  return (
    <div className="flex flex-col gap-4">
      {title && (
        <label className="font-medium text-gray-700 dark:text-gray-300">
          {title} ({currentImageCount}/{maxImages})
        </label>
      )}

      {/* Preview Images */}
      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previewImages.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>

              {/* Alt text input */}
              <input
                type="text"
                placeholder="Alt text (optional)"
                value={value[index]?.altText || ''}
                onChange={(e) => handleAltTextChange(index, e.target.value)}
                className="mt-2 w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {currentImageCount < maxImages && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragOver 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
          }`}
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
          
          <label htmlFor={`file-input-${name}`} className="cursor-pointer">
            <div className="space-y-2">
              <div className="text-gray-400">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Drop images here or click to select
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {maxImages - currentImageCount} more image{maxImages - currentImageCount !== 1 ? 's' : ''} allowed
                </p>
              </div>
            </div>
          </label>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {maxSize && (
        <p className="text-xs text-gray-500">
          Maximum file size: {maxSize / (1024 * 1024)}MB per image
        </p>
      )}
    </div>
  );
};

export default MultipleImageInput;