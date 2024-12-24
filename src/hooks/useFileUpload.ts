import { useState, useCallback } from 'react';
import { uploadService } from '../services';
import { logger } from '../utils/logger';

interface UseFileUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

interface UseFileUploadReturn {
  uploadFile: (file: File) => Promise<string>;
  isUploading: boolean;
  error: string | null;
  progress: number;
}

export const useFileUpload = (options: UseFileUploadOptions = {}): UseFileUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const validateFile = useCallback((file: File) => {
    if (options.maxSize && file.size > options.maxSize) {
      throw new Error(`File size must be less than ${options.maxSize / (1024 * 1024)}MB`);
    }

    if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
      throw new Error(`File type ${file.type} is not allowed`);
    }

    return true;
  }, [options.maxSize, options.allowedTypes]);

  const uploadFile = useCallback(async (file: File): Promise<string> => {
    try {
      setIsUploading(true);
      setError(null);
      setProgress(0);

      validateFile(file);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const url = await uploadService.uploadThumbnail(file);

      clearInterval(progressInterval);
      setProgress(100);

      if (!url) {
        throw new Error('No URL returned from upload');
      }

      options.onSuccess?.(url);
      return url;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to upload file';
      setError(error);
      options.onError?.(err as Error);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [validateFile, options]);

  return {
    uploadFile,
    isUploading,
    error,
    progress,
  };
};