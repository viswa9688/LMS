import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole } from '../../types/auth.types';

export const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.STUDENT,
  },
  avatar: String,
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
  },
  enrolledCourses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
  createdCourses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
}, {
  timestamps: true,
});