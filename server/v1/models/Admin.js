
class Admin {
  constructor() {
    this.adminTable = [
      {
        id: 1,
        fname: 'Salah',
        lname: 'Kante',
        email: 'kante@gmail.com',
        phone: '07812344234',
        username: 'salah',
        password: 'kante123',
      },
    ];
  }

  getAdminByEmail(email, password) {
    const searchAdmin = this.adminTable.find(
      (admin) => admin.email === email && admin.password === password,
    );

    if (searchAdmin) return searchAdmin;

    return false;
  }
}

export default Admin;
