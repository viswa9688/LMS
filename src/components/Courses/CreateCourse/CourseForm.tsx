import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { useCourseStore } from '../../../store/courseStore';
import { FormInput } from '../../UI/FormInput';
import { FormSelect } from '../../UI/FormSelect';
import { FormTextArea } from '../../UI/FormTextArea';
import { FormImageUpload } from '../../UI/FormImageUpload';
import { Button } from '../../UI/Button';
import { courseSchema } from '../../../utils/validation/courseSchema';
import { CATEGORIES, LANGUAGES, DIFFICULTY_LEVELS } from '../../../constants/course';
import type { CourseFormData } from '../../../types/course.types';

export const CourseForm = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addCourse, loading, error } = useCourseStore();
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      level: 'beginner',
      price: 0,
      language: 'English',
      instructorName: user?.name || '',
      instructorBio: '',
      thumbnail: 'https://via.placeholder.com/800x400',
    },
  });

  const onSubmit = async (data: CourseFormData) => {
    try {
      await addCourse({
        ...data,
        price: Number(data.price),
        discountPrice: data.discountPrice ? Number(data.discountPrice) : null,
      });
      navigate('/dashboard/instructor');
    } catch (err) {
      console.error('Failed to create course:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <FormInput
          label="Course Title"
          {...register('title')}
          error={errors.title?.message}
          placeholder="Enter a descriptive title"
        />

        <FormTextArea
          label="Course Description"
          {...register('description')}
          error={errors.description?.message}
          placeholder="Describe what students will learn"
        />

        <FormImageUpload
          label="Course Thumbnail"
          name="thumbnail"
          control={control}
          error={errors.thumbnail?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect
            label="Category"
            {...register('category')}
            error={errors.category?.message}
            options={CATEGORIES}
          />

          <FormSelect
            label="Difficulty Level"
            {...register('level')}
            error={errors.level?.message}
            options={DIFFICULTY_LEVELS}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Price ($)"
            type="number"
            min="0"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            error={errors.price?.message}
          />

          <FormSelect
            label="Language"
            {...register('language')}
            error={errors.language?.message}
            options={LANGUAGES}
          />
        </div>

        <div className="space-y-4">
          <FormInput
            label="Instructor Name"
            {...register('instructorName')}
            error={errors.instructorName?.message}
            disabled
          />

          <FormTextArea
            label="Instructor Bio"
            {...register('instructorBio')}
            error={errors.instructorBio?.message}
            placeholder="Share your expertise and teaching experience"
          />
        </div>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          isLoading={loading}
          className="w-full"
        >
          Create Course
        </Button>
      </div>
    </form>
  );
};