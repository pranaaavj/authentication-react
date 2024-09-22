import User from '../models/user.model.js';

export const test = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  res.json({ message: 'Hello' });
};
