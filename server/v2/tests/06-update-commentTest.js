import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import UserFakeData from '../mockdata/UserFakeData';
import IncidentFakeData from '../mockdata/IncidentFakeData';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

const { user1Token, user2Token } = UserFakeData.getUserToken();

const aRedFlag = IncidentFakeData.saveRedFlag();
const redFlagFiles = IncidentFakeData.saveRedFlagFiles();
let insertedData = {};
let insertedId = 0;
describe('TEST 06: Testing an endpoint for updating Red-Flag comment', () => {
  it('should return 201 http status code on success. after creating the 2nd record', async () => {
    const res = await chai.request(app)
      .post('/api/v2/red-flags')
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
      .field('long', aRedFlag.long);

    insertedData = res.body.data;
  });

  insertedId = insertedData.id;
  it('should return 200 http status code when a record comment updated', async () => {
    try {
      const res = await chai.request(app)
        .patch(`/api/v2/red-flags/${insertedId}/comment`)
        .set('token', user1Token)
        .send({ comment: aRedFlag.editComment });

      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equals(200).that.is.a('number');
      expect(res.body).to.have.property('data').that.is.a('object');
      expect(res.body).to.have.property('data').that.includes.property('id').that.is.a('number');
      expect(res.body).to.have.property('data').that.includes.property('message').equals('Updated red-flag record\'s comment.').that.is.a('string');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });

  it('should return 403 http status code on unallowed access', async () => {
    try {
      const res = await chai.request(app)
        .patch(`/api/v2/red-flags/${insertedId}/comment`)
        .set('token', user2Token)
        .send({ comment: aRedFlag.editComment });

      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equals(403).that.is.a('number');
      expect(res.body).to.have.property('error').that.is.a('string');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });

  it('should return 404 http status code on No found record to update it comment', async () => {
    try {
      const res = await chai.request(app)
        .patch(`/api/v2/red-flags/${0}/comment`)
        .set('token', user2Token)
        .send({ comment: aRedFlag.editComment });

      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equals(404).that.is.a('number');
      expect(res.body).to.have.property('data').equals('Sorry! a red-flag\'s comment to edit, not found.').that.is.a('string');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });

  it('should return 400 http status code on Bad request', async () => {
    const res = await chai.request(app)
      .patch(`/api/v2/red-flags/${insertedId}/comment`)
      .set('token', user1Token);

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('status').equals(400).that.is.a('number');
    expect(res.body).to.have.property('error').that.is.a('string');
  });

  it('should return 403 http status code on undefined token', async () => {
    const res = await chai.request(app)
      .patch(`/api/v2/red-flags/${insertedId}/comment`)
      .send({ comment: aRedFlag.editComment });

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('status').equals(403).that.is.a('number');
    expect(res.body).to.have.property('error').equals('Sorry! You have to Sign-in').that.is.a('string');
  });

  it('should return 401 http status code on invalid token', async () => {
    const res = await chai.request(app)
      .patch(`/api/v2/red-flags/${insertedId}/comment`)
      .set('token', 'bad-token')
      .send({ comment: aRedFlag.editComment });

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('status').equals(401).that.is.a('number');
    expect(res.body).to.have.property('error').equals('Invalid Token').that.is.a('string');
  });
});
