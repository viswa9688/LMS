import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '../../UI/FormInput';
import { LessonList } from './LessonList';

interface ModuleFormProps {
  moduleIndex: number;
}

export const ModuleForm: React.FC<ModuleFormProps> = ({ moduleIndex }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <FormInput
        label="Module Title"
        {...register(`modules.${moduleIndex}.title`)}
        error={errors.modules?.[moduleIndex]?.title?.message}
        placeholder="Enter module title"
      />
      <LessonList moduleIndex={moduleIndex} />
    </div>
  );
};