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

  async createCourse(courseData: FormData) {
    const { data } = await api.post<{ success: boolean; data: Course }>('/courses', courseData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  },

  async updateCourse(id: string, courseData: Partial<Course>) {
    const { data } = await api.put<{ success: boolean; data: Course }>(`/courses/${id}`, courseData);
    return data.data;
  },

  async deleteCourse(id: string) {
    await api.delete(`/courses/${id}`);
  },
};