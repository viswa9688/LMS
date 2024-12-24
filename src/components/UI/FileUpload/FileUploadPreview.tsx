import React from 'react';
import { X } from 'lucide-react';

interface FileUploadPreviewProps {
  file: File;
  preview: string;
  onRemove: () => void;
}

export const FileUploadPreview: React.FC<FileUploadPreviewProps> = ({ 
  file, 
  preview, 
  onRemove 
}) => {
  return (
    <div className="relative">
      <img
        src={preview}
        alt="Preview"
        className="mx-auto h-32 w-auto rounded object-cover"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
      >
        <X className="h-4 w-4" />
      </button>
      <p className="text-sm text-gray-500 mt-2">{file.name}</p>
    </div>
  );
};