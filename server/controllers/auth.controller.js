import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { createError } from '../utils/error.js';
import { logger } from '../utils/logger.js';

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
      role,
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

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
        token,
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

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    logger.info('Attempting user login', { email });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      logger.warn('Login failed - Invalid credentials', { email });
      return next(createError(401, 'Invalid credentials'));
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    logger.info('User logged in successfully', { 
      userId: user._id,
      email: user.email,
      role: user.role 
    });

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
      message: 'Login successful',
    });
  } catch (error) {
    logger.error('Login error', { 
      error: error.message,
      stack: error.stack,
    });
    next(error);
  }
};