import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  
  email: z
    .string()
    .email('Invalid email address')
    .max(100, 'Email cannot exceed 100 characters')
    .toLowerCase(),
  
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password cannot exceed 100 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  
  role: z.enum(['student', 'instructor'], {
    errorMap: () => ({ message: 'Role must be either student or instructor' }),
  }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .max(100, 'Email cannot exceed 100 characters')
    .toLowerCase(),
  
  password: z
    .string()
    .min(1, 'Password is required')
    .max(100, 'Password cannot exceed 100 characters'),
});