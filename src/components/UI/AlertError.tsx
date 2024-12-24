import React from 'react';
import { X } from 'lucide-react';

interface AlertErrorProps {
  message: string;
  onClose: () => void;
}

export const AlertError: React.FC<AlertErrorProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4">
      <div className="flex justify-between items-start">
        <div className="text-sm text-red-700">{message}</div>
        <button
          type="button"
          className="text-red-400 hover:text-red-500"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};