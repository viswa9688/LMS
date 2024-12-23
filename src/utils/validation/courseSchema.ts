import { z } from 'zod';

export const courseSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description cannot exceed 2000 characters'),
  
  thumbnail: z
    .string()
    .url('Please provide a valid URL for the thumbnail'),
  
  category: z
    .string()
    .min(1, 'Please select a category'),
  
  level: z
    .enum(['beginner', 'intermediate', 'advanced']),
  
  price: z
    .number()
    .min(0, 'Price cannot be negative')
    .max(9999.99, 'Price cannot exceed 9999.99'),
  
  discountPrice: z
    .number()
    .min(0, 'Discount price cannot be negative')
    .max(9999.99, 'Discount price cannot exceed 9999.99')
    .optional(),
  
  language: z
    .string()
    .min(1, 'Please select a language'),
  
  instructorName: z
    .string()
    .min(1, 'Instructor name is required'),
});