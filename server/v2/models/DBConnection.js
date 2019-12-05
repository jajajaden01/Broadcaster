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

  return pool;
};

export default DBConnection();
