import React from 'react';
import { CourseForm } from '../components/Courses/CreateCourse/CourseForm';

export const CreateCoursePage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
        <p className="mt-2 text-gray-600">Fill in the details below to create your course.</p>
      </div>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <CourseForm />
      </div>
    </div>
  );
};