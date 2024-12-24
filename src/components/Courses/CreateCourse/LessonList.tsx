import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, GripVertical, Trash2 } from 'lucide-react';
import { Button } from '../../UI/Button';
import { LessonForm } from './LessonForm';
import { DragDropContext, Droppable, Draggable } from '@dnd-kit/core';

interface LessonListProps {
  moduleIndex: number;
}

export const LessonList: React.FC<LessonListProps> = ({ moduleIndex }) => {
  const { control } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons`,
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  const addLesson = () => {
    append({
      type: 'video',
      title: '',
      content: '',
      resources: [],
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-700">Lessons</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addLesson}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Lesson
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={`lessons-${moduleIndex}`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((field, lessonIndex) => (
                <Draggable
                  key={field.id}
                  draggableId={`${moduleIndex}-${field.id}`}
                  index={lessonIndex}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mb-4"
                    >
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-4">
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="w-5 h-5 text-gray-400" />
                          </div>
                          <h5 className="text-sm font-medium">
                            Lesson {lessonIndex + 1}
                          </h5>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(lessonIndex)}
                            className="ml-auto text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <LessonForm
                          moduleIndex={moduleIndex}
                          lessonIndex={lessonIndex}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};