import bcrypt from 'bcrypt';

class Bcrypt {
  static encryt(password) {
    return bcrypt.hashSync(password, 10);
  }

  static compare(toCheckPwd, savedPwd) {
    return bcrypt.compareSync(toCheckPwd, savedPwd);
  }
}

export default Bcrypt;
