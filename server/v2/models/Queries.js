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

export default { userTable };
