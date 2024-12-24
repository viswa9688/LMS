import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '../../UI/FormInput';
import { FormSelect } from '../../UI/FormSelect';
import { FileUpload } from '../../UI/FileUpload';

interface VideoUploadProps {
  moduleIndex: number;
  lessonIndex: number;
}

const VIDEO_SOURCES = [
  { value: 'upload', label: 'Upload Video' },
  { value: 'youtube', label: 'YouTube URL' },
  { value: 'vimeo', label: 'Vimeo URL' },
];

export const VideoUpload: React.FC<VideoUploadProps> = ({ moduleIndex, lessonIndex }) => {
  const { register, watch, formState: { errors } } = useFormContext();
  const videoSource = watch(
    `modules.${moduleIndex}.lessons.${lessonIndex}.videoSource`
  );

  return (
    <div className="space-y-4">
      <FormSelect
        label="Video Source"
        {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.videoSource`)}
        error={errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.videoSource?.message}
        options={VIDEO_SOURCES}
      />

      {videoSource === 'upload' ? (
        <FileUpload
          label="Upload Video"
          name={`modules.${moduleIndex}.lessons.${lessonIndex}.video`}
          accept="video/*"
          maxSize={100 * 1024 * 1024} // 100MB
        />
      ) : (
        <FormInput
          label="Video URL"
          {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.videoUrl`)}
          error={errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.videoUrl?.message}
          placeholder={`Enter ${videoSource} URL`}
        />
      )}
    </div>
  );
};