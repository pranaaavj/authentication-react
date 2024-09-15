import User from '../models/user.model.js';
/**
 * @route GET /api/user/signup
 * @desc User signup
 * @access Public
 */
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.status(200).json({ message: 'User Created' });
};
