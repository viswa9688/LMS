import React from 'react';
import { useController, Control } from 'react-hook-form';
import { Upload, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FileUploadProps {
  name: string;
  label?: string;
  accept?: string;
  maxSize?: number;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  error,
}) => {
  const {
    field: { onChange, value },
    fieldState: { error: fieldError },
  } = useController({
    name,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > maxSize) {
        // Handle file size error
        return;
      }
      onChange(file);
    }
  };

  const clearFile = () => {
    onChange(null);
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div
        className={cn(
          "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md",
          "transition-colors duration-200",
          "hover:border-indigo-400",
          error || fieldError ? "border-red-300" : "border-gray-300"
        )}
      >
        <div className="space-y-1 text-center">
          {value ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{value.name}</span>
              <button
                type="button"
                onClick={clearFile}
                className="p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept={accept}
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">
                {accept ? `Allowed formats: ${accept}` : 'Any file type'}
                {maxSize && ` up to ${maxSize / (1024 * 1024)}MB`}
              </p>
            </>
          )}
        </div>
      </div>
      {(error || fieldError) && (
        <p className="text-sm text-red-600 mt-1">
          {error || fieldError?.message}
        </p>
      )}
    </div>
  );
};