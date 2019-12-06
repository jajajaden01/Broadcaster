import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class HeaderToken {
  static isUser(req, res, next) {
    if (!req.headers.token) {
      return res.status(403).json({
        status: res.statusCode,
        error: 'Sorry! You have to Sign-in',
      });
    }

    try {
      const decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY);
      if (decoded.userType === 'User') {
        req.userSignedIn = decoded;
      }
      return next();
    } catch (err) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Invalid Token',
      });
    }
  }
}

export default HeaderToken;
