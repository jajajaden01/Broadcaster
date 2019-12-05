import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import UserFakeData from '../mockdata/UserFakeData';
import IncidentFakeData from '../mockdata/IncidentFakeData';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

const {
  user1Token, user2Token,
} = UserFakeData.getUserToken();

const redFlag = IncidentFakeData.saveRedFlag();
const redFlagFiles = IncidentFakeData.saveRedFlagFiles();
let insertedId = 0;
describe('TEST 05: Testing an endpoint to get a Red-Flag', () => {
  it('should return 201 http status code on success. after creating the 2nd record', async () => {
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

    const { id } = res.body.data;
    insertedId = id;
  });

  it('should return 200 http status code when we found a record', async () => {
    try {
      const res = await chai.request(app)
        .get(`/api/v2/red-flags/${insertedId}`)
        .set('token', user1Token);

      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equals(200).that.is.a('number');
      expect(res.body).to.have.property('data').that.is.a('object');
      expect(res.body).to.have.property('data').that.includes.property('id').that.is.a('number');
      expect(res.body).to.have.property('data').that.includes.property('createdOn').that.is.a('string');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });

  it('should return 404 http status code on Not found Red-Flag.', async () => {
    try {
      const res = chai.request(app)
        .get(`/api/v2/red-flags/${0}`)
        .set('token', user2Token);

      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equals(404).that.is.a('number');
      expect(res.body).to.have.property('message').equals('Sorry! that red-flag not found.').that.is.a('string');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });

  it('should return 401 http status code on Invalid token', async () => {
    const res = await chai.request(app)
      .get(`/api/v2/red-flags/${insertedId}`)
      .set('token', 'bad-token');

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('status').equals(401).that.is.a('number');
    expect(res.body).to.have.property('error').equals('Invalid Token').that.is.a('string');
  });

  it('should return 403 http status code on Not signed-in user', async () => {
    const res = await chai.request(app)
      .get(`/api/v2/red-flags/${insertedId}`);

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('status').equals(403).that.is.a('number');
    expect(res.body).to.have.property('error').equals('Sorry! You have to Sign-in').that.is.a('string');
  });
});
