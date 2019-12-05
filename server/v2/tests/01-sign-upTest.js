import chai from 'chai';
import chaiHttp from 'chai-http';
import UserFakeData from '../mockdata/UserFakeData';
import app from '../../app';

chai.use(chaiHttp);
// eslint-disable-next-line no-unused-vars
const should = chai.should();
const { expect } = chai;

let thatUser = UserFakeData.saveFakeUser();

describe('TEST 01: Test Sign-Up endpoint', () => {
  it('should return 201 http status code on success', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/auth/signup')
        .send(thatUser);

      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equals(201).that.is.a('number');
      expect(res.body).to.have.property('message').equals('User created successfully.').that.is.a('string');
      expect(res.body.data).to.be.an('object');
      expect(res.body.data.token).that.is.a('string');
      expect(res.body.data.user_details).to.be.an('object');
    } catch (err) {
      (() => { throw err; }).should.throw();
      // process.stdout.write(`${err.message}\n`);
    }
  });

  it('should return 409 http status code on a User already exists in the system.', async () => {
    const res = await chai.request(app)
      .post('/api/v2/auth/signup')
      .send(thatUser);

    expect(res.body).to.have.property('status').equals(409).that.is.a('number');
    expect(res.body).to.have.property('error').equals('Sorry! User already exists in the system.').that.is.a('string');
  });

  it('should return 400 http status code on invalid credentials', async () => {
    thatUser = UserFakeData.saveFakeUser();
    thatUser.fname = '';
    const res = await chai.request(app)
      .post('/api/v2/auth/signup')
      .send(thatUser);

    expect(res.body).to.have.property('status').equals(401).that.is.a('number');
    expect(res.body).to.have.property('error').equals('invalid credentials').that.is.a('string');
  });
});
