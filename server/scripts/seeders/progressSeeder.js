import { Progress } from '../../models/index.js';
import { logger } from '../../utils/logger.js';

export async function seedProgress(users, courses) {
  try {
    logger.info('Creating sample progress records...');
    const student = users.find(user => user.role === 'student');
    
    if (!student || !courses.length) {
      throw new Error('Missing required data for progress seeding');
    }

    const progress = await Progress.create({
      user: student._id,
      course: courses[0]._id,
      completionStatus: 'in-progress',
      completedContent: [
        {
          contentId: courses[0].modules[0].content[0]._id,
          completedAt: new Date(),
        }
      ],
    });

    logger.info('Created progress records successfully');
    return progress;
  } catch (error) {
    logger.error('Error seeding progress:', error);
    throw error;
  }
}