import api from './api';
import { Course } from '../types';

interface CourseFilters {
  category?: string;
  level?: string;
  search?: string;
  sort?: string;
}

export const courseService = {
  async getCourses(filters: CourseFilters = {}) {
    const { data } = await api.get<Course[]>('/courses', { params: filters });
    return data;
  },

  async getCourseById(id: string) {
    const { data } = await api.get<Course>(`/courses/${id}`);
    return data;
  },

  async createCourse(courseData: Partial<Course>) {
    const { data } = await api.post<Course>('/courses', courseData);
    return data;
  },

  async updateCourse(id: string, courseData: Partial<Course>) {
    const { data } = await api.put<Course>(`/courses/${id}`, courseData);
    return data;
  },

  async deleteCourse(id: string) {
    await api.delete(`/courses/${id}`);
  },
};