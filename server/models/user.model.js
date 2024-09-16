import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username cannot be empty'], // Ensuring no empty value
      unique: [true, 'Username already exists'], // Ensuring no duplicate value
      max: [14, 'Username cannot exceed 14 characters'], // Max characters
      match: [
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores, without spaces',
      ], // Match regex for validation
      trim: true, // Trim whitespace
    },
    email: {
      type: String,
      required: [true, 'Email cannot be empty'],
      unique: [true, 'Email already exists'],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email',
      ], // Validating email
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password cannot be empty'],
      maxlength: [20, 'Password cannot exceed 14 characters'],
      trim: true,
    },
  },
  { timestamps: true } // Automatic createdAt and createdBy
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified()) next(); // Only hash again if the document is modified
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword; // replacing the password with hashed password
});

export default mongoose.model('User', UserSchema);
