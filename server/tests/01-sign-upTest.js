import chai from 'chai';
import chaiHttp from 'chai-http';
import UserFakeData from '../mockdata/UserFakeData';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const aUser = new UserFakeData();
let thatUser = aUser.saveFakeUser();

describe('TEST 01: Test Sign-Up endpoint', () => {
  it('should return 201 http status code on success', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(thatUser)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(201).that.is.a('number');
        expect(res.body).to.have.property('message').equals('User created successfully.').that.is.a('string');
        expect(res.body).to.have.property('data').to.be.an('object');
        expect(res.body).to.have.property('data').that.includes.property('token').that.is.a('string');
        return done();
      });
  });

  it('should return 409 http status code on a User already exists in the system.', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(thatUser)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.property('status').equals(409).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Sorry! User already exists in the system.').that.is.a('string');
        return done();
      });
  });

  it('should return 400 http status code on invalid credentials', (done) => {
    thatUser = aUser.saveFakeUserWithBadData();
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(thatUser)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.property('status').equals(400).that.is.a('number');
        expect(res.body).to.have.property('error').equals('invalid credentials').that.is.a('string');
        return done();
      });
  });
});
