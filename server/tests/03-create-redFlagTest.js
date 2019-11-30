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

describe('TEST 03: Testing an endpoint of creating a Red-Flag', () => {
  it('should return 201 http status code on success.', (done) => {
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
      .field('status', aRedFlag.pendingStatus)
      .field('comment', aRedFlag.comment)
      .field('lat', aRedFlag.lat)
      .field('long', aRedFlag.long)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(201).that.is.a('number');
        expect(res.body).to.have.property('data').that.is.a('object');
        expect(res.body).to.have.property('data').that.includes.property('id').that.is.a('number');
        expect(res.body).to.have.property('data').that.includes.property('message').equals(`Created ${aRedFlag.type} record`).that.is.a('string');
        return done();
      });
  });

  it('should return 409 http status code on the Incident that already exist.', (done) => {
    chai.request(app)
      .post('/api/v1/red-flags')
      .set('token', user1Token)
      .type('form')
      .attach('images', fs.readFileSync(redFlagFiles.image1Path), redFlagFiles.image1)
      .attach('videos', fs.readFileSync(redFlagFiles.video1Path), redFlagFiles.video1)
      .field('title', aRedFlag.title)
      .field('type', aRedFlag.type)
      .field('status', aRedFlag.pendingStatus)
      .field('comment', aRedFlag.comment)
      .field('lat', aRedFlag.lat)
      .field('long', aRedFlag.long)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(409).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Sorry! this Incident already exist.').that.is.a('string');
        return done();
      });
  });

  it('should return 400 http status code on Bad request', (done) => {
    chai.request(app)
      .post('/api/v1/red-flags')
      .set('token', user1Token)
      .type('form')
      .attach('images', fs.readFileSync(redFlagFiles.image1Path), redFlagFiles.image1)
      .attach('videos', fs.readFileSync(redFlagFiles.video1Path), redFlagFiles.video1)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(400).that.is.a('number');
        expect(res.body).to.have.property('error').that.is.a('string');
        return done();
      });
  });

  it('should return 401 http status code on Not allowed access', (done) => {
    chai.request(app)
      .post('/api/v1/red-flags')
      .set('token', admin1Token)
      .type('form')
      .attach('images', fs.readFileSync(redFlagFiles.image1Path), redFlagFiles.image1)
      .attach('videos', fs.readFileSync(redFlagFiles.video1Path), redFlagFiles.video1)
      .field('title', aRedFlag.title)
      .field('type', aRedFlag.type)
      .field('status', aRedFlag.pendingStatus)
      .field('comment', aRedFlag.comment)
      .field('lat', aRedFlag.lat)
      .field('long', aRedFlag.long)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(401).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Sorry! You do not have access for this request').that.is.a('string');
        return done();
      });
  });

  it('should return 401 http status code on Invalid token', (done) => {
    chai.request(app)
      .post('/api/v1/red-flags')
      .set('token', 'bad-Token')
      .type('form')
      .attach('images', fs.readFileSync(redFlagFiles.image1Path), redFlagFiles.image1)
      .attach('videos', fs.readFileSync(redFlagFiles.video1Path), redFlagFiles.video1)
      .field('title', aRedFlag.title)
      .field('type', aRedFlag.type)
      .field('status', aRedFlag.pendingStatus)
      .field('comment', aRedFlag.comment)
      .field('lat', aRedFlag.lat)
      .field('long', aRedFlag.long)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(401).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Invalid Token').that.is.a('string');
        return done();
      });
  });

  it('should return 403 http status code on undefined token', (done) => {
    chai.request(app)
      .post('/api/v1/red-flags')
      .type('form')
      .attach('images', fs.readFileSync(redFlagFiles.image1Path), redFlagFiles.image1)
      .attach('videos', fs.readFileSync(redFlagFiles.video1Path), redFlagFiles.video1)
      .field('title', aRedFlag.title)
      .field('type', aRedFlag.type)
      .field('status', aRedFlag.pendingStatus)
      .field('comment', aRedFlag.comment)
      .field('lat', aRedFlag.lat)
      .field('long', aRedFlag.long)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equals(403).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Sorry! You have to Sign-in').that.is.a('string');
        return done();
      });
  });
});
