import React, { useState, useEffect } from 'react';

const ImageInput = ({
  name,
  title,
  value = null,
  onChange,
  error,
  maxSize = 2 * 1024 * 1024, // 2MB default
  placeholder,
}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [altText, setAltText] = useState('');

  useEffect(() => {
    let objectUrl;

    // Handle different value formats
    if (value?.file instanceof File) {
      // New file selected
      objectUrl = URL.createObjectURL(value.file);
      setPreviewImage(objectUrl);
      setAltText(value.altText || '');
    } else if (value?.url) {
      // Existing image URL
      setPreviewImage(value.url);
      setAltText(value.altText || '');
    } else if (value instanceof File) {
      // Direct file (legacy support)
      objectUrl = URL.createObjectURL(value);
      setPreviewImage(objectUrl);
    } else if (typeof value === 'string') {
      // Direct URL (legacy support)
      setPreviewImage(value);
    } else {
      // No image
      setPreviewImage(null);
      setAltText('');
    }

    // Cleanup blob URLs
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [value]);

  const handleFileChange = (files) => {
    if (!files?.length) return;

    const file = files[0];

    // Validate file size
    if (maxSize && file.size > maxSize) {
      alert(`File size too large. Maximum allowed: ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Create the image object
    const imageValue = {
      file,
      url: '',
      altText: altText
    };

    onChange(imageValue);
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

  const handleRemoveImage = () => {
    // Cleanup blob URL if it exists
    if (previewImage?.startsWith('blob:')) {
      URL.revokeObjectURL(previewImage);
    }
    
    setPreviewImage(null);
    setAltText('');
    onChange(null);
  };

  const handleAltTextChange = (newAltText) => {
    setAltText(newAltText);
    
    if (value) {
      const updatedValue = {
        ...value,
        altText: newAltText
      };
      onChange(updatedValue);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {title && (
        <label className="font-medium text-gray-700 dark:text-gray-300">
          {title}
        </label>
      )}

      {/* Image Preview */}
      {previewImage && (
        <div className="relative inline-block">
          <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 group">
            <img
              src={previewImage}
              alt={altText || "Preview"}
              className="w-full h-full object-cover"
            />
            
            {/* Remove button */}
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove image"
            >
              ×
            </button>
          </div>

          {/* Alt text input */}
          <input
            type="text"
            placeholder="Alt text (optional)"
            value={altText}
            onChange={(e) => handleAltTextChange(e.target.value)}
            className="mt-2 w-48 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      )}

      {/* Upload Area */}
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
          name={name}
          accept="image/*"
          className="hidden"
          id={`file-input-${name}`}
          onChange={(e) => handleFileChange(e.target.files)}
        />
        
        <label htmlFor={`file-input-${name}`} className="cursor-pointer">
          <div className="space-y-2">
            <div className="text-gray-400">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                {placeholder || 'Drop an image here or click to select'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Supports JPG, PNG, GIF up to {maxSize / (1024 * 1024)}MB
              </p>
            </div>
          </div>
        </label>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default ImageInput;