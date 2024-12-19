import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { FormInput } from '../UI/FormInput';
import { FormSelect } from '../UI/FormSelect';
import { Button } from '../UI/Button';
import { AlertError } from '../UI/AlertError';

const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[@$!%*?&]/, 'Must contain at least one special character (@$!%*?&)'),
  
  confirmPassword: z.string(),
  role: z.enum(['student', 'instructor']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register: registerUser, error, validationErrors, loading, clearError } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'student',
    },
  });

  // Handle server-side validation errors
  useEffect(() => {
    if (validationErrors) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        setError(field as keyof RegisterFormData, { 
          type: 'server',
          message: message as string 
        });
      });
    }
  }, [validationErrors, setError]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearErrors();
      await registerUser(data.email, data.password, data.name, data.role);
      navigate('/dashboard');
    } catch (err) {
      // Errors are handled by the store and useEffect above
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {error && <AlertError message={error} onClose={clearError} />}
      
      <FormInput
        label="Full Name"
        type="text"
        {...register('name')}
        error={errors.name?.message}
      />

      <FormInput
        label="Email Address"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <FormInput
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />

      <FormInput
        label="Confirm Password"
        type="password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      <FormSelect
        label="Role"
        {...register('role')}
        error={errors.role?.message}
        options={[
          { value: 'student', label: 'Student' },
          { value: 'instructor', label: 'Instructor' },
        ]}
      />

      <Button
        type="submit"
        isLoading={loading || isSubmitting}
        className="w-full"
      >
        Create Account
      </Button>
    </form>
  );
};