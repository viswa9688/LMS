import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addCourse, loading } = useCourseStore();
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      instructorName: user?.name || '',
      instructorBio: '',
      language: 'English',
      level: 'beginner',
      price: 0,
      discountPrice: 0,
    },
  });

  const onSubmit = async (data: CourseFormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'thumbnail' && value instanceof File) {
            formData.append('thumbnail', value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      await addCourse(formData);
      navigate('/dashboard/instructor');
    } catch (error) {
      console.error('Failed to create course:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        label="Title"
        {...register('title')}
        error={errors.title?.message}
      />

      <FormTextArea
        label="Description"
        {...register('description')}
        error={errors.description?.message}
      />

      <FormImageUpload
        label="Course Thumbnail"
        name="thumbnail"
        control={control}
        error={errors.thumbnail?.message}
      />

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
        placeholder="Share your expertise and experience..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Category"
          {...register('category')}
          error={errors.category?.message}
          options={CATEGORIES}
        />

        <FormSelect
          label="Level"
          {...register('level')}
          error={errors.level?.message}
          options={DIFFICULTY_LEVELS}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Price"
          type="number"
          min="0"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          error={errors.price?.message}
        />

        <FormInput
          label="Discount Price"
          type="number"
          min="0"
          step="0.01"
          {...register('discountPrice', { valueAsNumber: true })}
          error={errors.discountPrice?.message}
        />
      </div>

      <FormSelect
        label="Language"
        {...register('language')}
        error={errors.language?.message}
        options={LANGUAGES}
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