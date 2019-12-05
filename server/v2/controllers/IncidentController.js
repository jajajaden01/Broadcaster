import Incident from '../models/Incident';
import Helper from '../helpers/theHelper';

class IncidentController {
  static async createIncident(req, res) {
    try {
      const userId = req.userSignedIn.id;

      req.body.createdOn = Helper.currentDate();
      req.body.images = Helper.getFileName(req.files.images);
      req.body.videos = Helper.getFileName(req.files.videos);

      const dataExist = await Incident.incidentExit(req.body);
      if (dataExist[0]) return res.status(409).json({ status: res.statusCode, error: 'Sorry! this Incident already exist.' });

      const isSaved = await Incident.saveIncident(req.body, Number(userId));
      return res.status(201).json({
        status: res.statusCode,
        data: {
          id: isSaved.id,
          message: `Created ${req.body.type} record`,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }
}

export default IncidentController;
