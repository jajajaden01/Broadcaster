import theHelper from '../helpers/theHelper';

class Incident {
  constructor() {
    this.Id = 0;
    this.createdOn = '';
    this.createdBy = 0;
    this.title = '';
    this.type = '';
    this.location = '';
    this.status = '';
    this.images = [];
    this.videos = [];
    this.comment = '';

    this.incidentTable = [];
  }

  incidentObject() {
    return {
      id: this.Id,
      createdOn: this.createdOn,
      createdBy: this.createdBy,
      title: this.title,
      type: this.type,
      location: this.location,
      status: this.status,
      images: this.images,
      videos: this.videos,
      comment: this.comment,
    };
  }

  saveIncident(title, type, comment, location, status, images, videos, userId) {
    this.Id = (this.incidentTable.length + 1);
    this.createdOn = theHelper.currentDate();
    this.createdBy = userId;
    this.title = title;
    this.type = type;
    this.location = location;
    this.status = status;
    this.images = images;
    this.videos = videos;
    this.comment = comment;

    this.incidentTable.push(this.incidentObject());

    return this.incidentObject();
  }

  getIncidentById(id) {
    const searchIncident = this.incidentTable.find((data) => String(data.id) === id);

    if (searchIncident) return searchIncident;

    return false;
  }

  getIncidentExisted(title, comment) {
    const searchIncident = this.incidentTable.find(
      (data) => data.title === title && data.comment === comment,
    );

    if (searchIncident) return searchIncident;

    return false;
  }

  getIncidents() {
    return this.incidentTable.sort((data1, data2) => data2.id - data1.id);
  }
}

export default Incident;
