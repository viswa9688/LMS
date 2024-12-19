import { UserRole } from '../../types/auth.types';

export const sampleUsers = [
  {
    name: 'John Instructor',
    email: 'john@example.com',
    password: 'Password123!',
    role: UserRole.INSTRUCTOR,
    bio: 'Experienced web development instructor',
  },
  {
    name: 'Alice Student',
    email: 'alice@example.com',
    password: 'Password123!',
    role: UserRole.STUDENT,
  },
];