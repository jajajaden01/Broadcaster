import DBConnection from './DBConnection';

const dropTables = async () => {
  if (process.env.NODE_ENV === 'test') {
    await DBConnection.query('DROP TABLE IF EXISTS users');
  }
};

dropTables();
