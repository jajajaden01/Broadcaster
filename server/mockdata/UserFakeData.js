import jwt from 'jsonwebtoken';
import faker from 'faker';
import dotenv from 'dotenv';

dotenv.config();

class UserFakeData {
  constructor() {
    this.Id = 0;
    this.Fname = '';
    this.Lname = '';
    this.Email = '';
    this.Phone = '';
    this.Username = '';
    this.Password = '';

    this.userTable = [];
  }

  userObject() {
    return {
      fname: this.Fname,
      lname: this.Lname,
      email: this.Email,
      phone: this.Phone,
      username: this.Username,
      password: this.Password,
    };
  }

  saveFakeUser() {
    this.Fname = faker.name.firstName();
    this.Lname = faker.name.lastName();
    this.Email = faker.internet.email();
    this.Phone = '1234567890';
    this.Username = faker.name.firstName();
    this.Password = faker.internet.password();

    this.userTable.push(this.userObject());

    return this.userObject();
  }

  saveFakeUserWithBadData() {
    this.Fname = '';
    this.Lname = faker.name.lastName();
    this.Email = faker.internet.email();
    this.Phone = faker.phone.phoneNumber();
    this.Username = faker.name.firstName();
    this.Password = faker.internet.password();

    this.userTable.push(this.userObject());

    return this.userObject();
  }

  static getUserToken() {
    const user1Token = jwt.sign({
      userId: 1,
      email: `user1${faker.internet.email()}`,
      userType: 'User',
    }, process.env.SECRET_KEY);

    const verifyUser1 = jwt.verify(user1Token, process.env.SECRET_KEY);

    const user2Token = jwt.sign({
      userId: 2,
      email: `user2${faker.internet.email()}`,
      userType: 'User',
    }, process.env.SECRET_KEY);

    const verifyUser2 = jwt.verify(user2Token, process.env.SECRET_KEY);

    const admin1Token = jwt.sign({
      userId: 1,
      email: `admin1${faker.internet.email()}`,
      userType: 'Admin',
    }, process.env.SECRET_KEY);

    const verifyAdmin1 = jwt.verify(admin1Token, process.env.SECRET_KEY);

    const readlAdminToken = jwt.sign({
      id: 1,
      email: 'kante@gmail.com',
      userType: 'Admin',
    }, process.env.SECRET_KEY);

    const verifyRealAdmin = jwt.verify(admin1Token, process.env.SECRET_KEY);

    return {
      user1Token,
      user2Token,
      verifyUser1,
      verifyUser2,
      admin1Token,
      verifyAdmin1,
      readlAdminToken,
      verifyRealAdmin,
    };
  }
}

export default UserFakeData;
