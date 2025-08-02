import React, { useState, useEffect, useCallback } from "react";

const ImagesInput = ({
  name,
  title,
  value = [],
  onChange,
  error,
  showPreview = false,
  enableAltText = false,
}) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [altTexts, setAltTexts] = useState([]);

  useEffect(() => {
    if (value?.length) {
      const previews = value.map((file) =>
        typeof file === "string" ? file : URL.createObjectURL(file)
      );
      setPreviewImages(previews);
      setAltTexts(value.map((_, i) => altTexts[i] || ''));
    } else {
      setPreviewImages([]);
      setAltTexts([]);
    }
    return () => {
      // Cleanup URL objects when component unmounts
      previewImages.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [value, altTexts]);

  const handleFileChange = (files) => {
    const newFiles = Array.from(files);
    const updatedFiles = [...value, ...newFiles];

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);

    // Initialize alt texts for new images
    setAltTexts((prev) => [...prev, ...Array(newFiles.length).fill('')]);

    // Trigger parent form's onChange with both files and alt texts
    onChange({
      target: {
        name,
        files: updatedFiles,
        altTexts: [...altTexts, ...Array(newFiles.length).fill('')]
      }
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleRemoveImage = useCallback((index) => {
    const updatedFiles = value.filter((_, i) => i !== index);
    const updatedAltTexts = altTexts.filter((_, i) => i !== index);
    const removedPreview = previewImages[index];
  
    if (removedPreview?.startsWith('blob:')) {
      URL.revokeObjectURL(removedPreview);
    }
  
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setAltTexts(updatedAltTexts);
    onChange({
      target: {
        name,
        files: updatedFiles,
        altTexts: updatedAltTexts,
      },
    });
  }, [value, altTexts, onChange, previewImages]); // <-- Closing parenthesis added
  

  return (
    <>
      <div className="flex flex-col gap-3 text-sm">
        <label className="font-medium dark:text-gray-300">{title}</label>

        {showPreview && (
          <div className="flex gap-2 flex-wrap">
            {previewImages.map((src, index) => (
              <div
                key={index}
                className="relative h-48 w-48 rounded-lg overflow-hidden border"
              >
                <img
                  src={src}
                  alt={altTexts[index] || `Preview ${index}`}
                  className="object-cover h-full w-full"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                >
                  Remove
                </button>
                {enableAltText && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                    <input
                      type="text"
                      placeholder="Alt text"
                      value={altTexts[index] || ''}
                      onChange={(e) => {
                        const newAltTexts = [...altTexts];
                        newAltTexts[index] = e.target.value;
                        setAltTexts(newAltTexts);
                        onChange({
                          target: {
                            name,
                            files: value,
                            altTexts: newAltTexts
                          }
                        });
                      }}
                      className="w-full px-2 py-1 text-xs bg-white rounded"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}




        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          className={`border-2 ${isDragOver ? "border-blue-500" : "border-dashed border-gray-300"
            } rounded-lg h-32 flex items-center justify-center cursor-pointer`}
        >
          <input
            type="file"
            name={name}
            accept="image/*"
            multiple
            className="hidden"
            id={`file-input-${name}`}
            onChange={(e) => handleFileChange(e.target.files)}
          />
          <label
            htmlFor={`file-input-${name}`}
            className="text-gray-500 cursor-pointer"
          >
            Drag and drop images here, or click to select
          </label>
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>

    </>
  );
};

export default ImagesInput;
