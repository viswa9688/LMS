import api from '../utils/api';
import { Course, CourseFormData } from '../types';

interface CourseFilters {
  category?: string;
  level?: string;
  search?: string;
  sort?: string;
}

export const courseService = {
  async getCourses(filters: CourseFilters = {}) {
    const { data } = await api.get<{ success: boolean; data: Course[] }>('/courses', { 
      params: filters 
    });
    return data.data || [];
  },

  async getCourseById(id: string) {
    const { data } = await api.get<{ success: boolean; data: Course }>(`/courses/${id}`);
    return data.data;
  },

  async createCourse(courseData: CourseFormData) {
    // Map form data to match backend expectations
    const mappedData = {
      title: courseData.title,
      description: courseData.description,
      category: courseData.category,
      level: courseData.level,
      price: Number(courseData.price),
      language: courseData.language,
      instructorName: courseData.instructorName,
      instructorBio: courseData.instructorBio || '',
      thumbnail: courseData.thumbnail instanceof File 
        ? 'https://via.placeholder.com/800x400' // For now using placeholder, implement file upload later
        : courseData.thumbnail,
    };

    const { data } = await api.post<{ success: boolean; data: Course }>(
      '/courses',
      mappedData,
      { withCredentials: true }
    );
    
    return data.data;
  },

  async updateCourse(id: string, courseData: Partial<Course>) {
    const { data } = await api.put<{ success: boolean; data: Course }>(
      `/courses/${id}`,
      courseData,
      { withCredentials: true }
    );
    return data.data;
  },

  async deleteCourse(id: string) {
    await api.delete(`/courses/${id}`, { withCredentials: true });
  },
};