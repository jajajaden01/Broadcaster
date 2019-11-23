import faker from 'faker';

class IncidentFakeData {
  static saveRedFlag() {
    return {
      title: faker.name.title(),
      type: 'red-flag',
      location: 'Unknow place, Kigali city, Rwanda',
      comment: 'Hello Africa, Please we Need to stop Corruption',
    };
  }

  static saveRedFlagFiles() {
    return {
      image1: 'Screenshot from 2019-06-22 22-06-47.png',
      image1Path: '/home/shyaka/Pictures/Screenshot from 2019-06-22 22-06-47.png',
      image2: 'Screenshot from 2019-06-23 11-37-00.png',
      image2Path: '/home/shyaka/Pictures/Screenshot from 2019-06-23 11-37-00.png',

      video1: 'Anti-Corruption Video1.mp4',
      video1Path: '/home/shyaka/Pictures/videos-to-test/Anti-Corruption Video1.mp4',
      video2: 'Anti-Corruption Video2.mp4',
      video2Path: '/home/shyaka/Pictures/videos-to-test/Anti-Corruption Video2.mp4',
    };
  }
}

export default IncidentFakeData;
