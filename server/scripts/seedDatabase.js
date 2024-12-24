import { connectDB } from '../config/db.js';
import { cleanupDatabase } from './utils/cleanup.js';
import { seedUsers } from './seeders/userSeeder.js';
import { seedCourses } from './seeders/courseSeeder.js';
import { seedProgress } from './seeders/progressSeeder.js';
import { logger } from '../utils/logger.js';

async function seedDatabase() {
  try {
    await connectDB();
    logger.info('Connected to MongoDB. Starting seed process...');

    await cleanupDatabase();
    
    const users = await seedUsers();
    const courses = await seedCourses(users);
    await seedProgress(users, courses);

    logger.info('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();