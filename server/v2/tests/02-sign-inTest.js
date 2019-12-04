import chai from 'chai';
import chaiHttp from 'chai-http';
import UserFakeData from '../mockdata/UserFakeData';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

const user = UserFakeData.saveFakeUser();
let userSignedUp = {
  email: user.email,
  password: user.password,
};
describe('TEST 02: Testing Sign-In endpoint', () => {
  it('should return 201 http status code on success', async () => {
    try {
      await chai.request(app)
        .post('/api/v2/auth/signup')
        .send(user);
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });

  it('should return 200 http status code on success and user logged-in', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/auth/signin')
        .send(userSignedUp);

      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equals(200).that.is.a('number');
      expect(res.body).to.have.property('message').equals('User is successfully logged in').that.is.a('string');
      expect(res.body.data).to.be.an('object');
      expect(res.body.data).to.have.property('token').that.is.a('string');
      expect(res.body.data).to.have.property('First_Name').that.is.a('string');
      expect(res.body.data).to.have.property('Last_Name').that.is.a('string');
      expect(res.body.data).to.have.property('Email').that.is.a('string');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });

  it('should return 401 http status code on the Inccorect Email or Password.', async () => {
    try {
      const unsavedUser = UserFakeData.saveFakeUser();
      userSignedUp = { email: unsavedUser.email, password: unsavedUser.password };

      const res = await chai.request(app)
        .post('/api/v2/auth/signin')
        .send(userSignedUp);

      expect(res.body).to.have.property('status').equals(401).that.is.a('number');
      expect(res.body).to.have.property('error').equals('Incorrect Email or Password').that.is.a('string');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });

  it('should return 400 http status code on Bad request', async () => {
    const unsavedUser = UserFakeData.saveFakeUser();
    userSignedUp = { email: unsavedUser.email };

    const res = await chai.request(app)
      .post('/api/v2/auth/signin')
      .send(userSignedUp);

    expect(res.body).to.have.property('status').equals(401).that.is.a('number');
    expect(res.body).to.have.property('error').that.is.a('string');
  });
});
