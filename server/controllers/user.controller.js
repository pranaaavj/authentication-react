import User from '../models/user.model.js';

export const getUser = async (req, res) => {
  const userId = req.query.id;

  const user = await User.findById({ _id: userId });

  res.status(200).json({
    success: true,
    message: 'User Details',
    data: {
      user,
    },
  });
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  console.log(req.params);
  const { email, username } = req.body;
  const file = req.file;
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    {
      email,
      username,
      image: file && file.filename, 
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: updatedUser,
    },
  });
};
