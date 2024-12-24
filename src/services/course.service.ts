import api from '../utils/api';
import { Course, } from '../types';
import { logger } from '../utils/logger';
import { CourseFormData } from '../types/course.types';

interface CourseFilters {
  category?: string;
  level?: string;
  search?: string;
  sort?: string;
}

export const courseService = {
  async getCourses(filters: CourseFilters = {}) {
    try {
      logger.info('Fetching courses with filters:', filters);

      const { data } = await api.get<{ success: boolean; data: Course[] }>('/courses', {
        params: filters
      });

      if (!data.success || !data.data) {
        throw new Error('Failed to fetch courses');
      }

      logger.info('Courses fetched successfully:', {
        count: data.data.length,
        sampleThumbnails: data.data.slice(0, 3).map(c => c.thumbnail)
      });

      return data.data;
    } catch (error) {
      logger.error('Failed to fetch courses:', error);
      throw error;
    }
  },

  async createCourse(courseData: CourseFormData) {
    try {
      logger.info('Creating course:', { title: courseData.title });

      const { data } = await api.post<{ success: boolean; data: Course }>(
        '/courses',
        courseData
      );

      if (!data.success || !data.data) {
        throw new Error('Failed to create course1');
      }

      logger.info('Course created successfully:', {
        courseId: data.data.id,
        thumbnail: data.data.thumbnail
      });

      return data.data;
    } catch (error) {
      logger.error('Failed to create course2:', error);
      throw error;
    }
  }
};