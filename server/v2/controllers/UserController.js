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

      const theToken = UserToken.generateToken({ id: isSaved.id, email, userType: 'User' });
      return res.status(201).json({
        status: res.statusCode,
        message: 'User created successfully.',
        data: {
          token: theToken,
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
}

export default UserController;
