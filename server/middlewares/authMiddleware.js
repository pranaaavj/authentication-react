import { NotAuthorizedError, NotFoundError } from '../errors/index.js';
import { verifyToken } from '../utils/token.js';

export const authMiddleware = (req, res, next) => {
  const headers = req.headers?.Authorization || req.headers?.authorization;
  if (!headers?.startsWith('Bearer '))
    throw new NotFoundError('Token not found');

  const token = headers.split(' ')[1];

  const decoded = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded) throw new NotAuthorizedError('Unauthorized');
  req.user = {
    username: decoded.username,
    email: decoded.email,
  };
  next();
};