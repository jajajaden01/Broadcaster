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

    jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, result) => {
      if (err) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'Invalid Token',
        });
      }

      if (result.userType !== 'User') {
        return res.status(401).json({
          status: res.statusCode,
          error: 'Sorry! You do not have access for this request',
        });
      }

      if (result.userType === 'User') req.userSignedIn = result;
      return next();
    });

    return res.status(401).json({
      status: res.statusCode,
      error: 'Sorry! You do not have access for this request',
    });
  }
}

export default HeaderToken;
