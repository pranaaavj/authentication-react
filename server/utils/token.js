import jwt from 'jsonwebtoken';
import { ForbiddenError } from '../errors/index.js';

// Creating refresh token
export const createRefreshToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  });
};

// Creating access token
export const createAccessToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
};

// Verify Token
export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new ForbiddenError('Forbidden');
  }
};
