import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import UserFakeData from '../mockdata/UserFakeData';
import IncidentFakeData from '../mockdata/IncidentFakeData';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const {
  user1Token, admin1Token,
} = UserFakeData.getUserToken();

const aRedFlag = IncidentFakeData.saveRedFlag();
const redFlagFiles = IncidentFakeData.saveRedFlagFiles();

describe('Testing an endpoint for deleting a Red-Flag', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/red-flags')
      .set('token', user1Token)
      .type('form')
      .attach('images', fs.readFileSync(redFlagFiles.image1Path), redFlagFiles.image1)
      .attach('videos', fs.readFileSync(redFlagFiles.video1Path), redFlagFiles.video1)
      .field('title', aRedFlag.title)
      .field('type', aRedFlag.type)
      .field('comment', aRedFlag.comment)
      .field('location', aRedFlag.location)
      .end(() => {
        done();
      });
  });

  it('should return 403 http status code on undefined token with no body', (done) => {
    chai.request(app)
      .delete(`/api/v1/red-flags/${1}`)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(403).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Sorry! You have to Sign-in').that.is.a('string');
        return done();
      });
  });

  it('should return 403 http status code on undefined token with empty body', (done) => {
    chai.request(app)
      .delete(`/api/v1/red-flags/${1}`)
      .send()
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(403).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Sorry! You have to Sign-in').that.is.a('string');
        return done();
      });
  });

  it('should return 404 http status code on empty body and valid token', (done) => {
    chai.request(app)
      .delete(`/api/v1/red-flags/${1}`)
      .set('token', user1Token)
      .send({ location: 'sdfsfgdfg' })
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(404).that.is.a('number');
        expect(res.body).to.have.property('data').equals('Sorry! a red-flag\'s record to delete, not found.').that.is.a('string');
        return done();
      });
  });

  it('should return 404 http status code on valid token with somthing in body', (done) => {
    chai.request(app)
      .delete(`/api/v1/red-flags/${1}`)
      .set('token', user1Token)
      .send({ location: 'sdfsfgdfg' })
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(404).that.is.a('number');
        expect(res.body).to.have.property('data').equals('Sorry! a red-flag\'s record to delete, not found.').that.is.a('string');
        return done();
      });
  });

  it('should return 401 http status code on invalid token', (done) => {
    chai.request(app)
      .delete(`/api/v1/red-flags/${1}`)
      .set('token', 'bad-token')
      .send({ location: 'sdfsdf' })
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(401).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Invalid Token').that.is.a('string');
        return done();
      });
  });

  it('should return 401 http status code on unallowed access', (done) => {
    chai.request(app)
      .delete(`/api/v1/red-flags/${1}`)
      .set('token', admin1Token)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(401).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Sorry! You do not have access for this request').that.is.a('string');
        return done();
      });
  });
});