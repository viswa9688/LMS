import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, X } from 'lucide-react';
import { Button } from '../../UI/Button';
import { FileUpload } from '../../UI/FileUpload';

interface ResourceUploadProps {
  moduleIndex: number;
  lessonIndex: number;
}

export const ResourceUpload: React.FC<ResourceUploadProps> = ({ moduleIndex, lessonIndex }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons.${lessonIndex}.resources`,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h5 className="text-sm font-medium text-gray-700">Resources</h5>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ file: null })}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Resource
        </Button>
      </div>

      {fields.map((field, resourceIndex) => (
        <div key={field.id} className="flex items-start gap-4">
          <FileUpload
            name={`modules.${moduleIndex}.lessons.${lessonIndex}.resources.${resourceIndex}.file`}
            accept=".pdf,.doc,.docx,.zip"
            maxSize={50 * 1024 * 1024} // 50MB
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => remove(resourceIndex)}
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};