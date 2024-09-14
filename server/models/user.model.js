import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username cannot be empty'],
    unique: [true, 'Username already exists'],
    max: [14, 'Username cannot exceed 14 characters'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    unique: [true, 'Email already exists'],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please provide a valid email',
    ],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty'],
    max: [20, 'Password cannot exceed 14 characters'],
    trim: true,
  },
});

export default mongoose.model('User', UserSchema);
