import User from '../models/user.model.js';
/**
 * @route GET /api/user/details
 * @desc Return current user
 * @access Private
 */
export const getUser = async (req, res) => {
  const userId = req.query.id;
  // Finding the user
  const user = await User.findById({ _id: userId });

  res.status(200).json({
    success: true,
    message: 'User Details',
    data: {
      user,
    },
  });
};
/**
 * @route POST /api/user/update/:id
 * @desc Update user details
 * @access Private
 */
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { email, username } = req.body;
  const file = req.file;
  console.log(file);
  // Finding and updating the user
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
