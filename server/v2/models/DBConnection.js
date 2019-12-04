import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const DBConnection = () => {
  let pool;
  if (process.env.NODE_ENV === 'test') {
    pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
  } else {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }

  pool.on('connect', () => {
    console.log('connected to the db');
  });

  return pool;
};

export default DBConnection();
