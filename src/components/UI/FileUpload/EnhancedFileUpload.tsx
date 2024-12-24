import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { FileUploadError } from './FileUploadError';
import { FileUploadProgress } from './FileUploadProgress';
import { logger } from '../../../utils/logger';
import { courseSchema } from '../../../utils/validation/courseSchema';

interface EnhancedFileUploadProps {
  label: string;
  onChange: (url: string) => void;
  error?: string;
  defaultPreview?: string;
  maxSize?: number;
  allowedTypes?: string[];
  onError?: (error: Error) => void;
}

export const EnhancedFileUpload: React.FC<EnhancedFileUploadProps> = ({
  label,
  onChange,
  error,
  defaultPreview,
  maxSize = 5 * 1024 * 1024,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
  onError,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(defaultPreview || '');

  const { uploadFile, isUploading, progress, error: uploadError } = useFileUpload({
    maxSize,
    allowedTypes,
    onSuccess: (url) => {
      logger.info('File upload successful', { url });
      setPreviewUrl(url);
      onChange(url);
    },
    onError: (err) => {
      logger.error('File upload failed', { error: err });
      onError?.(err);
    },
  });

  useEffect(() => {
    if (defaultPreview) {
      setPreviewUrl(defaultPreview);
    }
  }, [defaultPreview]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await uploadFile(file);
    } catch (error) {
      logger.error('File upload failed', { error });
      setPreviewUrl(defaultPreview || '');
      onError?.(error as Error);
    }
  };

  const handleRemove = () => {
    setPreviewUrl('');
    onChange('');
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div
        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${error || uploadError ? 'border-red-300' : 'border-gray-300 hover:border-indigo-400'
          }`}
      >
        <div className="space-y-1 text-center">
          {previewUrl ? (
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Preview"
                className="mx-auto h-32 w-auto rounded-lg object-cover"
                onError={() => {
                  logger.warn('Preview image failed to load', { url: previewUrl });
                  setPreviewUrl('');
                }}
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200 transition-colors"
              >
                <span className="sr-only">Remove</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept={allowedTypes.join(',')}
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to {maxSize / (1024 * 1024)}MB
              </p>
            </>
          )}

          {isUploading && <FileUploadProgress progress={progress} />}
        </div>
      </div>

      {(error || uploadError) && (
        <FileUploadError message={error || uploadError || ''} />
      )}
    </div>
  );
};