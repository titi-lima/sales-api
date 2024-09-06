import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient({
  log: process.env.NODE_ENV !== 'production' ? ['warn', 'error'] : [],
  errorFormat: process.env.NODE_ENV !== 'production' ? 'pretty' : 'colorless',
});

db.$connect()
  .then(() => {
    console.log('📦 Successfully connected with database');
  })
  .catch((error) => {
    console.log('❌ Error connecting to database', error);
  });
