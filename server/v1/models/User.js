
class User {
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
      id: this.Id,
      fname: this.Fname,
      lname: this.Lname,
      email: this.Email,
      phone: this.Phone,
      username: this.Username,
      password: this.Password,
    };
  }

  saveUser(fname, lname, email, phone, username, password) {
    this.Id = (this.userTable.length + 1);
    this.Fname = fname;
    this.Lname = lname;
    this.Email = email;
    this.Phone = phone;
    this.Username = username;
    this.Password = password;

    this.userTable.push(this.userObject());
  }

  getUserByEmail(email) {
    const searchUser = this.userTable.find((user) => user.email === email);

    if (searchUser) return searchUser;

    return false;
  }
}

export default User;
