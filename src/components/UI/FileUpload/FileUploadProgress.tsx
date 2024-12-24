import React from 'react';

interface FileUploadProgressProps {
  progress: number;
}

export const FileUploadProgress: React.FC<FileUploadProgressProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};