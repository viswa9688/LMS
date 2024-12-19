import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Environment variables schema
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  MONGODB_URI: z.string().min(1, 'MongoDB URI is required'),
  JWT_SECRET: z.string().min(1, 'JWT secret is required'),
});

// Validate environment variables
const validateEnv = () => {
  try {
    return envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      MONGODB_URI: process.env.MONGODB_URI,
      JWT_SECRET: process.env.JWT_SECRET,
    });
  } catch (error) {
    console.error('Invalid environment variables:', error.errors);
    process.exit(1);
  }
};

// Export validated config
export const config = {
  env: validateEnv().NODE_ENV,
  port: parseInt(validateEnv().PORT, 10),
  mongoUri: validateEnv().MONGODB_URI,
  jwtSecret: validateEnv().JWT_SECRET,
} as const;