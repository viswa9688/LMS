import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '../../UI/FormInput';
import { FormSelect } from '../../UI/FormSelect';
import { FormTextArea } from '../../UI/FormTextArea';
import { ResourceUpload } from './ResourceUpload';
import { VideoUpload } from './VideoUpload';

interface LessonFormProps {
  moduleIndex: number;
  lessonIndex: number;
}

const LESSON_TYPES = [
  { value: 'video', label: 'Video' },
  { value: 'text', label: 'Text Content' },
];

export const LessonForm: React.FC<LessonFormProps> = ({ moduleIndex, lessonIndex }) => {
  const { register, watch, formState: { errors } } = useFormContext();
  const lessonType = watch(`modules.${moduleIndex}.lessons.${lessonIndex}.type`);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormSelect
          label="Lesson Type"
          {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.type`)}
          error={errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.type?.message}
          options={LESSON_TYPES}
        />
        <FormInput
          label="Lesson Title"
          {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.title`)}
          error={errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.title?.message}
          placeholder="Enter lesson title"
        />
      </div>

      {lessonType === 'video' ? (
        <VideoUpload
          moduleIndex={moduleIndex}
          lessonIndex={lessonIndex}
        />
      ) : (
        <FormTextArea
          label="Content"
          {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.content`)}
          error={errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.content?.message}
          placeholder="Enter lesson content"
        />
      )}

      <ResourceUpload
        moduleIndex={moduleIndex}
        lessonIndex={lessonIndex}
      />
    </div>
  );
};