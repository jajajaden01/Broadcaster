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

  static async viewRedFlags(req, res) {
    try {
      const userId = req.userSignedIn.id;
      const redFlags = await Incident.getRedFlags(Number(userId));

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

  static async viewOneRedFlag(req, res) {
    try {
      const userId = req.userSignedIn.id;
      const redFlag = await Incident.getIncidentById(Number(userId), req.params.redFlagId);

      if (!redFlag) {
        return res.status(404).json({ status: res.statusCode, message: 'Sorry! that red-flag not found.' });
      }

      return res.status(200).json({ status: res.statusCode, data: redFlag });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }

  static async updateRedFlagLocation(req, res) {
    try {
      const userId = req.userSignedIn.id;

      const locationUpdate = await Incident.editRedFlagLocation(userId, req.params, req.body);
      if (locationUpdate) {
        return res.status(200).json({
          status: res.statusCode,
          data: {
            id: locationUpdate.id,
            message: 'Updated red-flag record\'s location.',
          },
        });
      }

      return res.status(404).json({
        status: res.statusCode,
        data: 'Sorry! a red-flag\'s location to edit, not found.',
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
