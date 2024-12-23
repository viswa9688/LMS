import { generateTokens } from '../../utils/token.js';
import { cookieConfig } from '../../config/cookie.config.js';
import User from '../../models/user.model.js';
import { createError } from '../../utils/error.js';
import { logger } from '../../utils/logger.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    logger.info('Attempting user registration', { email, role });

    const userExists = await User.findOne({ email });
    if (userExists) {
      logger.warn('Registration failed - Email already exists', { email });
      return next(createError(400, 'A user with this email already exists'));
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student', // Default to student if role not provided
    });

    // Generate tokens
    const tokens = await generateTokens(user);

    // Set cookies
    res.cookie('accessToken', tokens.accessToken, cookieConfig.accessToken);
    res.cookie('refreshToken', tokens.refreshToken, cookieConfig.refreshToken);

    logger.info('User registered successfully', { 
      userId: user._id,
      email: user.email,
      role: user.role 
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: 'Registration successful',
    });
  } catch (error) {
    logger.error('Registration error', { 
      error: error.message,
      stack: error.stack,
    });
    next(error);
  }
};