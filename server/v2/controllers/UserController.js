import User from '../models/User';
import UserToken from '../helpers/UserToken';

class UserController {
  static async signup(req, res) {
    try {
      const { email } = req.body;

      const userExist = await User.getUserByEmail(email);
      if (userExist[0]) {
        return res.status(409).json({
          status: res.statusCode,
          error: 'Sorry! User already exists in the system.',
        });
      }

      const isSaved = await User.saveUser(req.body);

      const token = UserToken.generateToken({ id: isSaved.id, email, userType: 'User' });
      return res.status(201).json({
        status: res.statusCode,
        message: 'User created successfully.',
        data: {
          token,
          user_details: {
            First_Name: isSaved.firstname,
            Last_Name: isSaved.lastname,
            Email: isSaved.email,
          },
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }

  static async signin(req, res) {
    try {
      const userExist = await User.checkUser(req.body);

      if (!userExist) {
        return res.status(401).json({ status: res.statusCode, error: 'Incorrect Email or Password' });
      }

      const token = UserToken.generateToken({
        id: userExist.id,
        email: userExist.email,
        userType: 'User',
      });

      return res.status(200).header('token', token).json({
        status: res.statusCode,
        message: 'User is successfully logged in',
        data: {
          token,
          First_Name: userExist.firstname,
          Last_Name: userExist.lastname,
          Email: userExist.email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error: error.message,
      });
    }
  }
}

export default UserController;
