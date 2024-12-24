import { User, Course, Progress } from '../../models/index.js';
import { logger } from '../../utils/logger.js';

export async function cleanupDatabase() {
  try {
    logger.info('Cleaning up existing database records...');
    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Progress.deleteMany({}),
    ]);
    logger.info('Database cleanup completed');
  } catch (error) {
    logger.error('Error cleaning up database:', error);
    throw error;
  }
}