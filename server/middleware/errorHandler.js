import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error('Error:', err);
  
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  const errors = err.errors || null;
  
  res.status(status).json({
    success: false,
    status,
    message,
    errors,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};