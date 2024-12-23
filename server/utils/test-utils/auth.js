import User from '../../models/user.model.js';
import bcrypt from 'bcryptjs';

export const createTestUser = async ({ 
  name = 'Test User',
  email = 'test@example.com',
  password = 'Password123!',
  role = 'student'
} = {}) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({
    name,
    email,
    password: hashedPassword,
    role
  });
};