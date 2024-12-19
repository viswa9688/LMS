import { Course } from '../../models';
import { sampleCourses } from '../data/courses';
import { UserRole } from '../../types/auth.types';
import logger from '../../utils/logger';
import type { User } from '../../types';

export async function seedCourses(users: User[]) {
  try {
    logger.info('Creating sample courses...');
    const instructor = users.find(user => user.role === UserRole.INSTRUCTOR);
    
    if (!instructor) {
      throw new Error('No instructor found to associate with courses');
    }

    const courses = await Promise.all(
      sampleCourses.map(course => 
        Course.create({ ...course, instructor: instructor.id })
      )
    );
    
    logger.info(`Created ${courses.length} courses successfully`);
    return courses;
  } catch (error) {
    logger.error('Error seeding courses:', error);
    throw error;
  }
}