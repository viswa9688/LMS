import { Progress } from '../../models';
import { UserRole } from '../../types/auth.types';
import logger from '../../utils/logger';
import type { User, Course } from '../../types';

export async function seedProgress(users: User[], courses: Course[]) {
  try {
    logger.info('Creating sample progress records...');
    const student = users.find(user => user.role === UserRole.STUDENT);
    
    if (!student || !courses.length) {
      throw new Error('Missing required data for progress seeding');
    }

    const progress = await Progress.create({
      user: student.id,
      course: courses[0].id,
      completionStatus: 'in-progress',
      completedContent: [
        {
          contentId: courses[0].modules[0].content[0].id,
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