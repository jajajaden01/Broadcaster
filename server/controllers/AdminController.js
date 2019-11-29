import Admin from '../models/Admin';
import UserToken from '../helpers/UserToken';

const anAdmin = new Admin();

class AdminController {
  static signin(req, res) {
    try {
      const adminExist = anAdmin.getAdminByEmail(req.body.email, req.body.password);

      if (!adminExist) {
        return res.status(401).json({ status: res.statusCode, error: 'Incorect Email or Password' });
      }

      const theToken = UserToken.generateToken({
        id: adminExist.id,
        email: adminExist.email,
        userType: 'Admin',
      });

      return res.status(200).header('token', theToken).json({
        status: res.statusCode,
        message: 'Admin is successfully logged in',
        data: {
          token: theToken,
          First_Name: adminExist.fname,
          Last_Name: adminExist.lname,
          Email: adminExist.email,
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

export default AdminController;
