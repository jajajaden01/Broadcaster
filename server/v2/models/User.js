import Bcrypt from '../helpers/Bcrypt';
import DBConnection from './DBConnection';
import Queries from './Queries';

class User {
  static async getUserByEmail(email) {
    await DBConnection.query(Queries.userTable.createTable);

    const { rows } = await DBConnection.query(Queries.userTable.isUserExist, [email]);

    return rows;
  }

  static async saveUser({
    fname, lname, email, phone, username, password,
  }) {
    const encryptedPassword = Bcrypt.encryt(password);

    const { rows } = await DBConnection.query(
      Queries.userTable.insertUser,
      [fname, lname, email, phone, username, encryptedPassword],
    );
    return rows[0];
  }

  static async checkaUser({ email, password }) {
    const checkEmail = await this.getUserByEmail(email);

    if (!checkEmail[0]) return false;

    const correctPwd = Bcrypt.compare(password, checkEmail[0].password);
    if (!correctPwd) return false;

    return checkEmail[0];
  }
}

export default User;
