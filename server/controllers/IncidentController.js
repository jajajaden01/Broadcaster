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

  static viewRedFlags(req, res) {
    try {
      const { userId } = req.body;
      const redFlags = anIncident.getRedFlags(userId);

      if (!redFlags) {
        return res.status(404).json({ status: res.statusCode, message: 'Sorry! there are no red-flags.' });
      }

      return res.status(200).json({ status: res.statusCode, data: redFlags });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }

  static viewaRedFlag(req, res) {
    try {
      const { userId } = req.body;
      const { redFlagId } = req.params;
      const aredFlag = anIncident.getIncidentById(userId, redFlagId);

      if (!aredFlag) {
        return res.status(404).json({ status: res.statusCode, message: 'Sorry! that red-flags not found.' });
      }

      return res.status(200).json({ status: res.statusCode, data: aredFlag });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }
}

export default IncidentController;
