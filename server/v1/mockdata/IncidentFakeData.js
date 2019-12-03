import faker from 'faker';
import path from 'path';

class IncidentFakeData {
  static saveRedFlag() {
    return {
      title: faker.name.title(),
      type: 'Red-Flag',
      lat: '8675',
      long: '12344',
      comment: 'Hello Africa, Please we Need to stop Corruption',
      draftStatus: 'draft',
      pendingStatus: 'pending',
      editLat: '86752111111',
      editLong: '1234426666666',
      editComment: 'Hello Africa, Please we Need to stop Corruption, check update',
    };
  }

  static saveRedFlagFiles() {
    return {
      image1: 'images-2019-11-18T19:33:52.412Z-1*cCdSJ0mOqjQkm-soL5hlIw.jpeg',
      image1Path: path.join(__dirname, '../uploads/images/images-2019-11-18T19:33:52.412Z-1*cCdSJ0mOqjQkm-soL5hlIw.jpeg'),
      image2: 'images-2019-11-24T20:47:40.150Z-Screenshot from 2019-06-22 22-06-47.png',
      image2Path: path.join(__dirname, '../uploads/images/images-2019-11-24T20:47:40.150Z-Screenshot from 2019-06-22 22-06-47.png'),

      video1: 'videos-2019-11-18T19:33:52.434Z-Anti-Corruption Video1.mp4',
      video1Path: path.join(__dirname, '../uploads/videos/videos-2019-11-18T19:33:52.434Z-Anti-Corruption Video1.mp4'),
      video2: 'videos-2019-11-24T20:47:40.184Z-Anti-Corruption Video1.mp4',
      video2Path: path.join(__dirname, '../uploads/videos/videos-2019-11-24T20:47:40.184Z-Anti-Corruption Video1.mp4'),
    };
  }
}

export default IncidentFakeData;
