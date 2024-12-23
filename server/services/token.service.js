import Token from '../models/token.model.js';
import { logger } from '../utils/logger.js';

export class TokenService {
  async saveToken(token, userId, type, expiresAt) {
    try {
      return await Token.create({
        token,
        userId,
        type,
        expiresAt,
      });
    } catch (error) {
      logger.error('Error saving token:', error);
      throw error;
    }
  }

  async findToken(token, type, userId) {
    return Token.findOne({ token, type, userId });
  }

  async deleteToken(tokenId) {
    return Token.deleteOne({ _id: tokenId });
  }

  async blacklistToken(token, userId) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
    return this.saveToken(token, userId, 'blacklisted', expiresAt);
  }

  async isTokenBlacklisted(token) {
    return !!(await Token.findOne({ token, type: 'blacklisted' }));
  }
}

export const tokenService = new TokenService();