import { z } from 'zod';

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url('Invalid Supabase URL').optional(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required').optional(),
  VITE_SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Supabase service role key is required').optional(),
});

const parseEnvVars = () => {
  try {
    const parsed = envSchema.parse(import.meta.env);
    
    // Provide fallback values for development
    return {
      VITE_SUPABASE_URL: parsed.VITE_SUPABASE_URL || 'http://localhost:54321',
      VITE_SUPABASE_ANON_KEY: parsed.VITE_SUPABASE_ANON_KEY || 'your-anon-key',
      VITE_SUPABASE_SERVICE_ROLE_KEY: parsed.VITE_SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key',
    };
  } catch (error) {
    console.warn('Environment variables validation failed:', error);
    
    // Return development defaults
    return {
      VITE_SUPABASE_URL: 'http://localhost:54321',
      VITE_SUPABASE_ANON_KEY: 'your-anon-key',
      VITE_SUPABASE_SERVICE_ROLE_KEY: 'your-service-role-key',
    };
  }
};

export const env = parseEnvVars();