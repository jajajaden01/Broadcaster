import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import UserFakeData from '../mockdata/UserFakeData';
import IncidentFakeData from '../mockdata/IncidentFakeData';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

const { user1Token } = UserFakeData.getUserToken();

const redFlag = IncidentFakeData.saveRedFlag();
const redFlagFiles = IncidentFakeData.saveRedFlagFiles();

describe('TEST 03: Testing an endpoint of creating a Red-Flag', () => {
  it('should return 201 http status code on success.', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/red-flags')
        .set('token', user1Token)
        .type('form')
        .attach('images', fs.readFileSync(redFlagFiles.image1Path), redFlagFiles.image1)
        .attach('images', fs.readFileSync(redFlagFiles.image2Path), redFlagFiles.image2)
        .attach('videos', fs.readFileSync(redFlagFiles.video1Path), redFlagFiles.video1)
        .attach('videos', fs.readFileSync(redFlagFiles.video2Path), redFlagFiles.video2)
        .field('title', redFlag.title)
        .field('type', redFlag.type)
        .field('status', redFlag.pendingStatus)
        .field('comment', redFlag.comment)
        .field('lat', redFlag.lat)
        .field('long', redFlag.long);

      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equals(201).that.is.a('number');
      expect(res.body).to.have.property('data').that.is.a('object');
      expect(res.body).to.have.property('data').that.includes.property('id').that.is.a('number');
      expect(res.body).to.have.property('data').that.includes.property('message').equals(`Created ${redFlag.type} record`).that.is.a('string');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });

  it('should return 409 http status code on the Incident that already exist.', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/red-flags')
        .set('token', user1Token)
        .type('form')
        .attach('images', fs.readFileSync(redFlagFiles.image1Path), redFlagFiles.image1)
        .attach('videos', fs.readFileSync(redFlagFiles.video1Path), redFlagFiles.video1)
        .field('title', redFlag.title)
        .field('type', redFlag.type)
        .field('status', redFlag.pendingStatus)
        .field('comment', redFlag.comment)
        .field('lat', redFlag.lat)
        .field('long', redFlag.long);

      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equals(409).that.is.a('number');
      expect(res.body).to.have.property('error').equals('Sorry! this Incident already exist.').that.is.a('string');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });

  it('should return 400 http status code on Bad request', async () => {
    const res = await chai.request(app)
      .post('/api/v2/red-flags')
      .set('token', user1Token)
      .type('form')
      .attach('images', fs.readFileSync(redFlagFiles.image1Path), redFlagFiles.image1)
      .attach('videos', fs.readFileSync(redFlagFiles.video1Path), redFlagFiles.video1);

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('status').equals(400).that.is.a('number');
    expect(res.body).to.have.property('error').that.is.a('string');
  });

  it('should return 401 http status code on Invalid token', async () => {
    const res = await chai.request(app)
      .post('/api/v2/red-flags')
      .set('token', 'bad-Token')
      .type('form')
      .attach('images', fs.readFileSync(redFlagFiles.image1Path), redFlagFiles.image1)
      .attach('videos', fs.readFileSync(redFlagFiles.video1Path), redFlagFiles.video1)
      .field('title', redFlag.title)
      .field('type', redFlag.type)
      .field('status', redFlag.pendingStatus)
      .field('comment', redFlag.comment)
      .field('lat', redFlag.lat)
      .field('long', redFlag.long);

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('status').equals(401).that.is.a('number');
    expect(res.body).to.have.property('error').equals('Invalid Token').that.is.a('string');
  });

  it('should return 403 http status code on undefined token', async () => {
    const res = await chai.request(app)
      .post('/api/v2/red-flags')
      .type('form')
      .attach('images', fs.readFileSync(redFlagFiles.image1Path), redFlagFiles.image1)
      .attach('videos', fs.readFileSync(redFlagFiles.video1Path), redFlagFiles.video1)
      .field('title', redFlag.title)
      .field('type', redFlag.type)
      .field('status', redFlag.pendingStatus)
      .field('comment', redFlag.comment)
      .field('lat', redFlag.lat)
      .field('long', redFlag.long);

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('status').equals(403).that.is.a('number');
    expect(res.body).to.have.property('error').equals('Sorry! You have to Sign-in').that.is.a('string');
  });
});
