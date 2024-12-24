import bcrypt from 'bcryptjs';
import { User } from '../../models/index.js';
import { sampleUsers } from '../data/users.js';
import { logger } from '../../utils/logger.js';

export async function seedUsers() {
  try {
    logger.info('Creating sample users...');
    const users = await Promise.all(
      sampleUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return User.create({ ...user, password: hashedPassword });
      })
    );
    logger.info(`Created ${users.length} users successfully`);
    return users;
  } catch (error) {
    logger.error('Error seeding users:', error);
    throw error;
  }
}