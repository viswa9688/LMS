import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export const courseSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters'),

  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description cannot exceed 2000 characters'),

  thumbnail: z.union([
    // Validate as a File
    z.instanceof(File)
      .refine(
        file => file.size <= MAX_FILE_SIZE,
        `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
      )
      .refine(
        file => ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Only .jpg, .jpeg, .png and .gif formats are supported'
      ),
    // Validate as a URL
    z.string()
      .url('Please provide a valid image URL')
  ]),

  category: z
    .string()
    .min(1, 'Please select a category'),

  level: z
    .enum(['beginner', 'intermediate', 'advanced']),

  price: z
    .number()
    .min(0, 'Price cannot be negative')
    .max(9999.99, 'Price cannot exceed 9999.99'),

  language: z
    .string()
    .min(1, 'Please select a language'),

  instructorName: z
    .string()
    .min(1, 'Instructor name is required'),

  instructorBio: z
    .string()
    .optional(),
});

export type CourseFormData = z.infer<typeof courseSchema>;
