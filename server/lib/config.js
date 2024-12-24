import dotenv from 'dotenv';

dotenv.config();

export const config = {
  supabase: {
    url: process.env.VITE_SUPABASE_URL,
    anonKey: process.env.VITE_SUPABASE_ANON_KEY,
  },
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  server: {
    port: process.env.PORT || 50001,
    jwtSecret: process.env.JWT_SECRET,
  },
} as const;

// Validate required environment variables
const requiredVars = [
  ['MONGODB_URI', config.mongodb.uri],
  ['JWT_SECRET', config.server.jwtSecret],
  ['VITE_SUPABASE_URL', config.supabase.url],
  ['VITE_SUPABASE_ANON_KEY', config.supabase.anonKey],
];

for (const [name, value] of requiredVars) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}