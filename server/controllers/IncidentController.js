import Incident from '../models/Incident';
import theHelper from '../helpers/theHelper';

const anIncident = new Incident();

class IncidentController {
  static createIncident(req, res) {
    const {
      title, type, comment, location, userId,
    } = req.body;

    let { images } = req.files;
    let { videos } = req.files;

    images = theHelper.getFileName(images);
    videos = theHelper.getFileName(videos);

    const dataExist = anIncident.getIncidentExisted(title, comment);
    if (dataExist) return res.status(409).json({ status: res.statusCode, error: 'Sorry! this Incident already exist.' });

    const isSaved = anIncident.saveIncident(title, type, comment, location, 'draft', images, videos, Number(userId));
    if (!isSaved) {
      return res.status(500).json({ status: res.statusCode, error: 'Sorry! we got a Server Error' });
    }

    return res.status(200).json({
      status: res.statusCode,
      data: {
        id: isSaved.id,
        message: `Created ${type} record`,
      },
    });
  }
}

export default IncidentController;
