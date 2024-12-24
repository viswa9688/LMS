import { supabaseAdmin } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';

class StorageService {
  private async uploadFile(file: File, bucket: string): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
      const fileName = `${uuidv4()}.${fileExt}`;

      logger.info('Starting file upload', {
        bucket,
        fileName,
        fileType: file.type,
        fileSize: file.size
      });

      // Upload file
      const { data, error: uploadError } = await supabaseAdmin.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError || !data) {
        logger.error('Upload failed', { error: uploadError });
        throw new Error('Failed to upload file');
      }

      // Get public URL
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from(bucket)
        .getPublicUrl(data.path);

      // Verify URL is accessible
      const response = await fetch(publicUrl, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error('Failed to verify uploaded file URL');
      }

      logger.info('Upload successful', { publicUrl });
      return publicUrl;
    } catch (error) {
      logger.error('Upload failed', { error });
      throw error;
    }
  }

  async uploadThumbnail(file: File): Promise<string> {
    return this.uploadFile(file, 'course-thumbnails');
  }
}

export const storageService = new StorageService();