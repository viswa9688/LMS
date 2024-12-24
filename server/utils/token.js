import jwt from 'jsonwebtoken';
import { tokenService } from '../services/token.service.js';
import { logger } from './logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-here';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-here';

export const generateTokens = async (user) => {
  try {
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Store refresh token
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await tokenService.saveToken(refreshToken, user._id, 'refresh', expiresAt);

    return { accessToken, refreshToken };
  } catch (error) {
    logger.error('Error generating tokens:', error);
    throw error;
  }
};

export const verifyToken = async (token, secret) => {
  try {
    // Check blacklist
    const isBlacklisted = await tokenService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      throw new Error('Token is blacklisted');
    }

    return jwt.verify(token, secret || JWT_SECRET);
  } catch (error) {
    logger.error('Token verification failed:', error);
    throw error;
  }
};

export const blacklistToken = async (token, userId) => {
  try {
    await tokenService.blacklistToken(token, userId);
  } catch (error) {
    logger.error('Error blacklisting token:', error);
    throw error;
  }
};