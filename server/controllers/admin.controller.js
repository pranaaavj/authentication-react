import User from '../models/user.model.js';
/**
 * @route GET /api/users
 * @desc Getting all the users
 * @access Private
 */
export const getAllUsers = async (req, res) => {
  // Getting all the users
  const users = await User.find();

  res.status(200).json({
    success: true,
    message: 'All Users',
    data: {
      users,
    },
  });
};
/**
 * @route PATCH /api/users/:id
 * @desc Updating a single user
 * @access Private
 */
export const updateUser = async (req, res) => {
  const { email, username } = req.body;
  const file = req.file;
  console.log(file);
  const { id } = req.params;
  // Updating the user
  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    {
      email,
      username,
      image: file && file.filename,
    },
    { new: true }
  );
  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: {
      user: updatedUser,
    },
  });
};
/**
 * @route DELETE /api/users/:id
 * @desc Delete user
 * @access Private
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  // Updating the user
  await User.findByIdAndDelete({ _id: id });

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: null,
  });
};
