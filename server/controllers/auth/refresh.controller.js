import { cookieConfig } from '../../config/cookie.config.js';
import { createError } from '../../utils/error.js';
import { generateTokens, verifyToken } from '../../utils/token.js';
import Token from '../../models/token.model.js';
import User from '../../models/user.model.js';

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    
    if (!refreshToken) {
      return next(createError(401, 'Refresh token not found'));
    }

    // Verify refresh token
    const decoded = await verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Check if refresh token exists in database
    const tokenDoc = await Token.findOne({ 
      token: refreshToken,
      type: 'refresh',
      userId: decoded.userId
    });

    if (!tokenDoc) {
      return next(createError(401, 'Invalid refresh token'));
    }

    // Get user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return next(createError(401, 'User not found'));
    }

    // Generate new tokens
    const tokens = await generateTokens(user);

    // Delete old refresh token
    await Token.deleteOne({ _id: tokenDoc._id });

    // Set cookies
    res.cookie('accessToken', tokens.accessToken, cookieConfig.accessToken);
    res.cookie('refreshToken', tokens.refreshToken, cookieConfig.refreshToken);

    res.json({ success: true });
  } catch (error) {
    next(createError(401, 'Invalid refresh token'));
  }
};