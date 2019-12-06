import chai from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import UserFakeData from '../mockdata/UserFakeData';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

const aUser = new UserFakeData();
const thatUser = aUser.saveFakeUser();

describe('TEST 02: Testing Sign-In endpoint', () => {
  let userSignedUp;

  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(thatUser)
      .end(() => {
        userSignedUp = {
          email: thatUser.email,
          password: thatUser.password,
        };
        done();
      });
  });

  it('should return 200 http status code on success and user logged-in', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userSignedUp)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(200).that.is.a('number');
        expect(res.body).to.have.property('message').equals('User is successfully logged in').that.is.a('string');
        expect(res.body).to.have.property('data').that.includes.property('token').that.is.a('string');
        done();
      });
  });

  it('should return 401 http status code on the Inccorect Email or Password.', (done) => {
    const unsavedUsed = aUser.saveFakeUser();
    userSignedUp = { email: unsavedUsed.email, password: unsavedUsed.password };

    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userSignedUp)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(401).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Incorect Email or Password').that.is.a('string');
        done();
      });
  });

  it('should return 400 http status code on Bad request', (done) => {
    const unsavedUsed = aUser.saveFakeUser();
    userSignedUp = { email: unsavedUsed.email };

    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userSignedUp)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(400).that.is.a('number');
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
  });
});
