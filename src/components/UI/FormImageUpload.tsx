import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Upload, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FormImageUploadProps {
  label: string;
  name: string;
  control: Control<any>;
  error?: string;
  defaultPreview?: string;
}

export const FormImageUpload: React.FC<FormImageUploadProps> = ({
  label,
  name,
  control,
  error,
  defaultPreview,
}) => {
  const [preview, setPreview] = useState<string>(defaultPreview || '');

  const handleFileChange = (onChange: (file: File) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  const handleDrop = (onChange: (file: File) => void) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  const clearPreview = (onChange: (value: null) => void) => () => {
    setPreview('');
    onChange(null);
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div 
            className={cn(
              "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md",
              "transition-colors duration-200",
              "hover:border-indigo-400",
              error ? "border-red-300" : "border-gray-300"
            )}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop(onChange)}
          >
            <div className="space-y-1 text-center">
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="mx-auto h-32 w-auto rounded"
                  />
                  <button
                    type="button"
                    onClick={clearPreview(onChange)}
                    className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor={name}
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id={name}
                        name={name}
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange(onChange)}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};