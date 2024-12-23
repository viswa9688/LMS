import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema } from '../../../utils/validation/courseSchema';
import { useAuthStore } from '../../../store/authStore';
import { useCourseStore } from '../../../store/courseStore';
import { FormInput } from '../../UI/FormInput';
import { FormSelect } from '../../UI/FormSelect';
import { FormTextArea } from '../../UI/FormTextArea';
import { FormImageUpload } from '../../UI/FormImageUpload';
import { Button } from '../../UI/Button';
import { CourseFormData } from '../../../types/course.types';
import { CATEGORIES, LANGUAGES, DIFFICULTY_LEVELS } from '../../../constants/course';

export const CourseForm = () => {
  const { user } = useAuthStore();
  const { addCourse, loading } = useCourseStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      instructorName: user?.name || '',
      language: 'English',
      level: 'beginner',
      price: 0,
      discountPrice: 0,
    },
  });

  const onSubmit = async (data: CourseFormData) => {
    try {
      await addCourse(data);
      // Handle success (e.g., redirect to course page)
    } catch (error) {
      // Handle error
      console.error('Failed to create course:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        label="Course Title"
        {...register('title')}
        error={errors.title?.message}
      />

      <FormTextArea
        label="Course Description"
        {...register('description')}
        error={errors.description?.message}
      />

      <FormImageUpload
        label="Course Thumbnail"
        control={control}
        name="thumbnail"
        error={errors.thumbnail?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Instructor Name"
          {...register('instructorName')}
          disabled
          error={errors.instructorName?.message}
        />

        <FormTextArea
          label="Instructor Bio"
          {...register('instructorBio')}
          error={errors.instructorBio?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Category"
          {...register('category')}
          options={CATEGORIES}
          error={errors.category?.message}
        />

        <FormSelect
          label="Difficulty Level"
          {...register('level')}
          options={DIFFICULTY_LEVELS}
          error={errors.level?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Price"
          type="number"
          min="0"
          step="0.01"
          {...register('price', {
            setValueAs: (value) => parseFloat(value) || 0
          })}
          error={errors.price?.message}
        />

        <FormInput
          label="Discount Price"
          type="number"
          min="0"
          step="0.01"
          {...register('discountPrice', {
            setValueAs: (value) => parseFloat(value) || 0
          })}
          error={errors.discountPrice?.message}
        />
      </div>

      <FormSelect
        label="Language"
        {...register('language')}
        options={LANGUAGES}
        error={errors.language?.message}
      />

      <Button
        type="submit"
        isLoading={loading}
        className="w-full"
      >
        Create Course
      </Button>
    </form>
  );
};