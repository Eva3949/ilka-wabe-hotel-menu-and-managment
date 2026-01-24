import { db } from '../lib/db';
import { admins } from './schema';
import bcrypt from 'bcryptjs';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

async function seed() {
  console.log('Seeding initial owner...');
  
  const hashedPassword = await bcrypt.hash('owner123', 10);
  
  try {
    await db.insert(admins).values({
      id: uuidv4(),
      username: 'owner',
      password: hashedPassword,
      role: 'owner',
    });
    console.log('Owner seeded successfully!');
    console.log('Username: owner');
    console.log('Password: owner123');
  } catch (error) {
    console.error('Error seeding owner:', error);
  }
  
  process.exit(0);
}

seed();
