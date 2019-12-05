import faker from 'faker';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class UserFakeData {
  static userObject() {
    this.Fname = faker.name.firstName();
    this.Lname = faker.name.lastName();
    this.Email = faker.internet.email();
    this.Phone = '1234567890';
    this.Username = faker.name.firstName();
    this.Password = faker.internet.password();

    return {
      fname: this.Fname,
      lname: this.Lname,
      email: this.Email,
      phone: this.Phone,
      username: this.Username,
      password: this.Password,
    };
  }

  static saveFakeUser() {
    return this.userObject();
  }

  static getUserToken() {
    const user1Token = jwt.sign({
      id: 1,
      email: `user1${faker.internet.email()}`,
      userType: 'User',
    }, process.env.SECRET_KEY);

    const user2Token = jwt.sign({
      id: -2,
      email: `user2${faker.internet.email()}`,
      userType: 'User',
    }, process.env.SECRET_KEY);

    const admin1Token = jwt.sign({
      id: 1,
      email: `admin1${faker.internet.email()}`,
      userType: 'Admin',
    }, process.env.SECRET_KEY);

    const admin2Token = jwt.sign({
      id: -2,
      email: 'kante@gmail.com',
      userType: 'Admin',
    }, process.env.SECRET_KEY);

    return {
      user1Token,
      user2Token,
      admin1Token,
      admin2Token,
    };
  }
}

export default UserFakeData;
