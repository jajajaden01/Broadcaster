import chai from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import fs from 'fs';
import UserFakeData from '../mockdata/UserFakeData';
import IncidentFakeData from '../mockdata/IncidentFakeData';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const {
  user1Token, user2Token, admin1Token,
} = UserFakeData.getUserToken();

const aRedFlag = IncidentFakeData.saveRedFlag();
const redFlagFiles = IncidentFakeData.saveRedFlagFiles();

describe('Testing an endpoint of retrieving all Red-Flag for a user', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/red-flags')
      .set('token', user1Token)
      .type('form')
      .attach('images', fs.readFileSync(redFlagFiles.image1Path), redFlagFiles.image1)
      .attach('images', fs.readFileSync(redFlagFiles.image2Path), redFlagFiles.image2)
      .attach('videos', fs.readFileSync(redFlagFiles.video1Path), redFlagFiles.video1)
      .attach('videos', fs.readFileSync(redFlagFiles.video2Path), redFlagFiles.video2)
      .field('title', aRedFlag.title)
      .field('type', aRedFlag.type)
      .field('comment', aRedFlag.comment)
      .field('location', aRedFlag.location)
      .end((err) => {
        if (err) return done(err);

        return done();
      });
  });

  it('should return 404 http status code on No Found red-flags.', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags')
      .set('token', user2Token)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(404).that.is.a('number');
        expect(res.body).to.have.property('message').equals('Sorry! there are no red-flags.').that.is.a('string');
        return done();
      });
  });

  it('should return 403 http status code on missed token', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags')
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(403).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Sorry! You have to Sign-in').that.is.a('string');
        return done();
      });
  });

  it('should return 401 http status code on the Invalid Token', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags')
      .set('token', 'bad-token')
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(401).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Invalid Token').that.is.a('string');
        return done();
      });
  });

  it('should return 401 http status code on unAuthorized request', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags')
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
