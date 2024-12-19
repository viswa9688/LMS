import { create } from 'zustand';
import { Course } from '../types';
import { courseService } from '../services/course.service';

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  fetchCourses: (filters?: {
    category?: string;
    level?: string;
    search?: string;
    sort?: string;
  }) => Promise<void>;
  addCourse: (course: Partial<Course>) => Promise<void>;
  updateCourse: (courseId: string, updates: Partial<Course>) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  loading: false,
  error: null,

  fetchCourses: async (filters = {}) => {
    try {
      set({ loading: true, error: null });
      const courses = await courseService.getCourses(filters);
      set({ courses, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch courses', 
        loading: false 
      });
    }
  },

  addCourse: async (courseData) => {
    try {
      const newCourse = await courseService.createCourse(courseData);
      set((state) => ({
        courses: [...state.courses, newCourse],
      }));
    } catch (error) {
      throw error;
    }
  },

  updateCourse: async (courseId, updates) => {
    try {
      const updatedCourse = await courseService.updateCourse(courseId, updates);
      set((state) => ({
        courses: state.courses.map((course) =>
          course.id === courseId ? updatedCourse : course
        ),
      }));
    } catch (error) {
      throw error;
    }
  },

  deleteCourse: async (courseId) => {
    try {
      await courseService.deleteCourse(courseId);
      set((state) => ({
        courses: state.courses.filter((course) => course.id !== courseId),
      }));
    } catch (error) {
      throw error;
    }
  },
}));