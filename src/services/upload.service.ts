import { supabaseAdmin } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';

class UploadService {
  private async uploadToSupabase(file: File, bucket: string): Promise<string> {
    const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
    const fileName = `${uuidv4()}.${fileExt}`;

    logger.info('Starting file upload to Supabase', {
      bucket,
      fileName,
      fileType: file.type,
      fileSize: file.size
    });

    try {
      // Upload the file directly
      const { data, error: uploadError } = await supabaseAdmin.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        logger.error('Supabase upload error', { error: uploadError });
        throw new Error('Failed to upload file');
      }

      if (!data?.path) {
        throw new Error('Upload successful but no path returned');
      }

      // Get the public URL
      const { data: urlData } = supabaseAdmin.storage
        .from(bucket)
        .getPublicUrl(data.path);



      const publicUrl = urlData?.publicUrl;
      if (!publicUrl || !(publicUrl.startsWith('http://') || publicUrl.startsWith('https://'))) {
        logger.error('Invalid URL format:', { publicUrl });
        throw new Error('Invalid URL format');
      }

      if (!urlData?.publicUrl) {
        throw new Error('Failed to get public URL');
      }


      logger.info('File uploaded successfully', {
        path: data.path,
        publicUrl: urlData.publicUrl
      });

      return urlData.publicUrl;
    } catch (error) {
      logger.error('File upload failed', { error });
      throw new Error('Failed to upload file');
    }
  }

  async uploadThumbnail(file: File): Promise<string> {
    return this.uploadToSupabase(file, 'course-thumbnails');
  }
}

export const uploadService = new UploadService();

