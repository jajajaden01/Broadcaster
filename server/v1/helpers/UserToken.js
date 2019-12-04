import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class UserToken {
  static generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY);
  }
}

export default UserToken;
