import User from '../models/User';
import UserToken from '../helpers/UserToken';
import Bcrypt from '../helpers/Bcrypt';

const aUser = new User();

class UserController {
  static signup(req, res) {
    const {
      fname, lname, email, phone, username, password,
    } = req.body;

    const userExist = aUser.getUserByEmail(email);
    if (userExist) {
      res.status(409).json({
        status: res.statusCode,
        error: 'Sorry! User already exists in the system.',
      });
    } else {
      const encryptedPassword = Bcrypt.encryt(password);
      aUser.saveUser(fname, lname, email, phone, username, encryptedPassword);
      const userId = aUser.userObject().id;
      const theToken = UserToken.generateToken({ userId, email, userType: 'User' });
      res.status(201).json({
        status: res.statusCode,
        message: 'User created successfully.',
        data: {
          token: theToken,
          user_details: {
            First_Name: aUser.Fname,
            Last_Name: aUser.Lname,
            Email: aUser.Email,
          },
        },
      });
    }
  }

  static signin(req, res) {
    const userExist = aUser.getUserByEmail(req.body.email);

    if (!userExist) {
      return res.status(401).json({ status: res.statusCode, error: 'Incorect Email or Password' });
    }

    const password = Bcrypt.decryt(req.body.password, userExist.password);
    if (!password) {
      return res.status(401).json({ status: res.statusCode, message: 'Incorect Email or Password' });
    }

    const theToken = UserToken.generateToken({
      id: userExist.Id,
      email: userExist.Email,
      userType: 'User',
    });

    return res.status(200).header('Broadcaster-user-token', theToken).json({
      status: res.statusCode,
      message: 'User is successfully logged in',
      data: {
        token: theToken,
        First_Name: userExist.fname,
        Last_Name: userExist.lname,
        Email: userExist.email,
      },
    });
  }
}

export default UserController;
