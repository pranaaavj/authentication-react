import User from '../models/user.model.js';
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from '../utils/token.js';
import { NotAuthorizedError, NotFoundError } from '../errors/index.js';
/**
 * @route POST /api/user/signup
 * @desc User sign up
 * @access Public
 */
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  await User.create({ username, email, password });
  res.status(201).json({
    success: true,
    message: 'User Created',
    data: null,
  }); //Todo Check for user exists
};
/**
 * @route POST /api/user/signin
 * @desc User sign in
 * @access Public
 */
export const signin = async (req, res) => {
  const { email, password } = req.body;
  //check for user
  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError('User not found');
  // confirm user entered password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new NotAuthorizedError('Invalid Credentials');

  const refreshToken = createRefreshToken(user);
  const accessToken = createAccessToken(user);
  res
    .status(200)
    .cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 60 * 60 * 24 * 1000,
    })
    .json({
      success: true,
      message: 'User logged in',
      data: { user, accessToken },
    });
};
/**
 * @route POST /api/user/refresh
 * @desc create new access token
 * @access Public
 */
export const refresh = async (req, res) => {
  const refreshToken = req.cookies?.jwt;
  // Verifying the validity of refresh token
  if (!refreshToken) throw new NotAuthorizedError('Not Authorized');
  const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const user = await User.findOne({ email: decoded.email });
  if (!user) throw new NotAuthorizedError('Not Authorized');

  // Creating new refresh token
  const accessToken = createAccessToken(user);

  res.status(200).json({
    success: true,
    message: 'Access token created',
    data: { user, accessToken },
  });
};
/**
 * @route POST /api/user/google
 * @desc check if is user exists else create one
 * @access Public
 */
export const googleSignUp = async (req, res) => {
  const { email, username, photoURL } = req.body;

  // Sending token if user exists
  const user = await User.findOne({ email });
  if (user) {
    const refreshToken = createRefreshToken(user);
    const accessToken = createAccessToken(user);

    res
      .status(200)
      .cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 60 * 60 * 24 * 1000,
      })
      .json({
        success: true,
        message: 'User logged in',
        data: { user, accessToken },
      });
  } else {
    // Create new user if user doesn't exist
    const newPassword = Math.random().toString(36).slice(-8);
    const newUser = await User.create({
      username:
        username.split(' ').join('').toLowerCase() +
        Math.floor(Math.random() * 10000).toString(),
      email,
      profilePhoto: photoURL,
      password: newPassword,
    });

    const refreshToken = createRefreshToken(newUser);
    const accessToken = createAccessToken(newUser);

    res
      .status(200)
      .cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 60 * 60 * 24 * 1000,
      })
      .json({
        success: true,
        message: 'User logged in',
        data: { user: newUser, accessToken },
      });
  }
};
