import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { createError } from '../utils/error.js';
import { logger } from '../utils/logger.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      logger.warn('No token found');
      return next(createError(401, 'Not authorized'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        logger.warn('User not found for token');
        return next(createError(401, 'User not found'));
      }

      req.user = user;
      next();
    } catch (error) {
      logger.error('Token verification failed:', error);
      return next(createError(401, 'Invalid token'));
    }
  } catch (error) {
    logger.error('Auth middleware error:', error);
    next(createError(401, 'Not authorized'));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      logger.warn(`User role ${req.user.role} not authorized for this route`);
      return next(createError(403, 'Not authorized to access this route'));
    }
    next();
  };
};