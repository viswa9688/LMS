import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FileUploadErrorProps {
  message: string;
}

export const FileUploadError: React.FC<FileUploadErrorProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-red-600 mt-1">
      <AlertCircle className="w-4 h-4" />
      <span>{message}</span>
    </div>
  );
};