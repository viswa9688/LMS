import { config } from '../config/config';
import { connectDB } from '../config/database';
import User from '../models/user.model';
import Course from '../models/course.model';
import Progress from '../models/progress.model';
import { UserRole } from '../types/auth.types';
import { CourseLevel, ContentType } from '../types/course.types';
import bcrypt from 'bcryptjs';

const sampleUsers = [
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

const sampleCourses = [
  {
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of web development',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    category: 'Programming',
    level: CourseLevel.BEGINNER,
    price: 0,
    modules: [
      {
        title: 'Introduction to HTML',
        order: 1,
        content: [
          {
            type: ContentType.VIDEO,
            title: 'HTML Basics',
            url: 'https://example.com/video1',
            duration: 600,
            order: 1,
          },
        ],
      },
    ],
    status: 'published',
  },
];

async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Progress.deleteMany({}),
    ]);

    // Create users
    const users = await Promise.all(
      sampleUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return User.create({ ...user, password: hashedPassword });
      })
    );

    // Create courses with instructor reference
    const instructor = users.find(user => user.role === UserRole.INSTRUCTOR);
    const courses = await Promise.all(
      sampleCourses.map(course => 
        Course.create({ ...course, instructor: instructor._id })
      )
    );

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();