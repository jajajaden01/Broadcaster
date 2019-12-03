import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('TEST 11: Testing Sign-In endpoint', () => {
  it('should return 200 http status code on success and user logged-in', (done) => {
    chai.request(app)
      .post('/api/v1/admin-panel/signin')
      .send({ email: 'kante@gmail.com', password: 'kante123' })
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(200).that.is.a('number');
        expect(res.body).to.have.property('message').equals('Admin is successfully logged in').that.is.a('string');
        expect(res.body).to.have.property('data').that.includes.property('token').that.is.a('string');
        done();
      });
  });

  it('should return 401 http status code on the Inccorect Email or Password.', (done) => {
    chai.request(app)
      .post('/api/v1/admin-panel/signin')
      .send({ email: 'kante1111@gmail.com', password: 'kante123' })
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(401).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Incorect Email or Password').that.is.a('string');
        done();
      });
  });

  it('should return 400 http status code on Bad request', (done) => {
    chai.request(app)
      .post('/api/v1/admin-panel/signin')
      .send({ email: 'kante@gmail.com' })
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(400).that.is.a('number');
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
  });
});
