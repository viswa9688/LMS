import { Course } from '../../models/index.js';
import { sampleCourses } from '../data/courses.js';
import { logger } from '../../utils/logger.js';

export async function seedCourses(users) {
  try {
    logger.info('Creating sample courses...');
    const instructor = users.find(user => user.role === 'instructor');
    
    if (!instructor) {
      throw new Error('No instructor found to associate with courses');
    }

    const courses = await Promise.all(
      sampleCourses.map(course => 
        Course.create({ ...course, instructor: instructor._id })
      )
    );
    
    logger.info(`Created ${courses.length} courses successfully`);
    return courses;
  } catch (error) {
    logger.error('Error seeding courses:', error);
    throw error;
  }
}