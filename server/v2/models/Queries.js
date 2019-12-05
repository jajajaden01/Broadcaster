const userTable = {
  createTable: `CREATE TABLE IF NOT EXISTS 
    users(
      id SERIAL PRIMARY KEY NOT NULL,
      firstname VARCHAR(128) NOT NULL,
      lastname VARCHAR(128) NOT NULL,
      email VARCHAR(128) UNIQUE NOT NULL,
      phone VARCHAR(128) NOT NULL,
      username VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL
      )`,
  insertUser: 'INSERT INTO users( firstname, lastname, email, phone, username, password) VALUES($1 ,$2, $3, $4, $5, $6) RETURNING *',
  isUserExist: 'SELECT * FROM users WHERE email = $1',
};

const incidentTable = {
  createTable: `CREATE TABLE IF NOT EXISTS 
    incident(
      id SERIAL PRIMARY KEY NOT NULL,
      title VARCHAR(100) NOT NULL,
      type VARCHAR(128) NOT NULL,
      location VARCHAR(100) NOT NULL,
      status VARCHAR(50) NOT NULL,
      images TEXT[],
      videos TEXT[],
      comment TEXT NOT NULL,
      createdOn VARCHAR(100) NOT NULL,
      createdBy INT NOT NULL
      )`,
  insertIncident: 'INSERT INTO incident( title, type, comment, location, status, images, videos, createdOn, createdBy) VALUES($1 ,$2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
  incidentExist: 'SELECT * FROM incident WHERE title = $1 AND comment = $2',
  allIncident: 'SELECT * FROM incident WHERE createdBy = $1',
  oneIncident: 'SELECT * FROM incident WHERE createdBy = $1 AND id = $2',
  updateLocation: 'UPDATE incident SET location = $1 WHERE id = $2 RETURNING *',
};

export default { userTable, incidentTable };
