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
      const oneData = await Incident.getoneIncident(req.params.redFlagId);
      if (!oneData) return res.status(404).json({ status: res.statusCode, error: 'Sorry! that red-flag not found.' });

      const redFlag = await Incident.getIncidentById(Number(userId), req.params.redFlagId);

      if (!redFlag) return res.status(403).json({ status: res.statusCode, message: 'You are not allowed to access this record !' });

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

      if (locationUpdate === 'not-allowed') {
        return res.status(403).json({
          status: res.statusCode,
          error: 'You are not allowed to access this record !',
        });
      }

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

  static async updateRedFlagComment(req, res) {
    try {
      const userId = req.userSignedIn.id;
      const commentUpdate = await Incident.editRedFlagComment(userId, req.params, req.body);

      if (commentUpdate === 'not-allowed') {
        return res.status(403).json({
          status: res.statusCode,
          error: 'You are not allowed to access this record !',
        });
      }

      if (commentUpdate) {
        return res.status(200).json({
          status: res.statusCode,
          data: {
            id: commentUpdate.id,
            message: 'Updated red-flag record\'s comment.',
          },
        });
      }

      return res.status(404).json({
        status: res.statusCode,
        data: 'Sorry! a red-flag\'s comment to edit, not found.',
      });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }

  static async removeRedFlag(req, res) {
    try {
      const userId = req.userSignedIn.id;
      const redFlagToRemove = await Incident.deleteRedFlag(userId, req.params);

      if (redFlagToRemove === 'not-allowed') {
        return res.status(403).json({
          status: res.statusCode,
          error: 'You are not allowed to access this record !',
        });
      }

      if (redFlagToRemove) {
        return res.status(200).json({
          status: res.statusCode,
          data: {
            id: redFlagToRemove.id,
            message: 'red-flag record has been deleted.',
          },
        });
      }

      return res.status(404).json({
        status: res.statusCode,
        data: 'Sorry! a red-flag\'s record to delete, not found.',
      });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }

  static async putInPending(req, res) {
    try {
      const userId = req.userSignedIn.id;
      const recordInPending = await Incident.editIncidentStatus(userId, req.params, 'pending');

      if (recordInPending === 'not-allowed') {
        return res.status(403).json({
          status: res.statusCode,
          error: 'You are not allowed to access this record !',
        });
      }

      if (recordInPending) {
        return res.status(200).json({
          status: res.statusCode,
          data: {
            id: recordInPending.id,
            message: 'This red-flag has been added in pending state.',
          },
        });
      }

      return res.status(404).json({
        status: res.statusCode,
        error: 'Sorry! a red-flag not found.',
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
