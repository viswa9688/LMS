import dotenv from 'dotenv';
import { createApp } from './config/app.js';
import { connectDB } from './config/db.js';
import { startServer } from './utils/server.js';
import { logger } from './utils/logger.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const init = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Create Express app
    const app = createApp();
    
    // Start server with automatic port handling
    await startServer(app, PORT);
  } catch (error) {
    logger.error('Failed to initialize server:', error);
    process.exit(1);
  }
};

init();