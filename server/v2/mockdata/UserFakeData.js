import faker from 'faker';
import dotenv from 'dotenv';

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
}

export default UserFakeData;
