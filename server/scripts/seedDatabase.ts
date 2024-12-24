import { connectDB } from '../config/database';
import { cleanupDatabase } from './utils/cleanup';
import { seedUsers } from './seeders/userSeeder';
import { seedCourses } from './seeders/courseSeeder';
import { seedProgress } from './seeders/progressSeeder';
import logger from '../utils/logger';

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