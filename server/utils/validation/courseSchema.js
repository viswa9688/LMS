import { z } from 'zod';

export const courseSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters')
    .transform(val => val.trim()),
  
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description cannot exceed 2000 characters')
    .transform(val => val.trim()),
  
  category: z
    .string()
    .min(1, 'Category is required'),
  
  level: z
    .enum(['beginner', 'intermediate', 'advanced']),
  
  price: z
    .number()
    .min(0, 'Price cannot be negative')
    .max(9999.99, 'Price cannot exceed 9999.99')
    .default(0)
    .transform(val => Number(val) || 0),
  
  language: z
    .string()
    .min(1, 'Language is required')
    .default('English'),
  
  thumbnail: z
    .string()
    .url('Thumbnail must be a valid URL')
    .optional()
    .default('https://via.placeholder.com/800x400'),
});