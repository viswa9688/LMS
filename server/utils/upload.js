import { v2 as cloudinary } from 'cloudinary';
import { logger } from './logger.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file) => {
  try {
    // Create a temporary file path or use the buffer directly
    const result = await cloudinary.uploader.upload(file.tempFilePath || file.path, {
      folder: 'course-thumbnails',
      width: 800,
      height: 400,
      crop: 'fill',
      quality: 'auto',
    });

    logger.info('Image uploaded successfully', { publicId: result.public_id });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    logger.error('Image upload failed:', error);
    throw new Error('Failed to upload image');
  }
};