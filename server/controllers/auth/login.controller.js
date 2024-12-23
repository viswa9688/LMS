import { generateTokens } from '../../utils/token.js';
import { cookieConfig } from '../../config/cookie.config.js';
import User from '../../models/user.model.js';
import { createError } from '../../utils/error.js';
import { logger } from '../../utils/logger.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      logger.warn('Login failed - Invalid credentials', { email });
      return next(createError(401, 'Invalid credentials'));
    }

    // Generate tokens
    const tokens = await generateTokens(user);

    // Set cookies
    res.cookie('accessToken', tokens.accessToken, cookieConfig.accessToken);
    res.cookie('refreshToken', tokens.refreshToken, cookieConfig.refreshToken);

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