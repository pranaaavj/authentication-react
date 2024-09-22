import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: [14, 'Username cannot exceed 14 characters'], // Max characters
      match: [
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores, without spaces',
      ], // Match regex for validation
      trim: true, // Trim whitespace
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email',
      ], // Validating email
      trim: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: [20, 'Password cannot exceed 20 characters'],
    },
    image: {
      type: String,
      default:
        'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true } // Automatic createdAt and createdBy
);

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next(); // Only hash again if the document is modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // replacing the password with hashed password
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);
