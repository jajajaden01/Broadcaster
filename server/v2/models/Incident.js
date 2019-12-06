import DBConnection from './DBConnection';
import Queries from './Queries';

class User {
  static async incidentExit({ title, comment }) {
    await DBConnection.query(Queries.incidentTable.createTable);

    const { rows } = await DBConnection.query(
      Queries.incidentTable.incidentExist, [title, comment],
    );

    return rows;
  }

  static async saveIncident({
    title, type, comment, lat, long, status, images, videos, createdOn,
  }, userId) {
    const location = `${lat},${long}`;

    const { rows } = await DBConnection.query(
      Queries.incidentTable.insertIncident,
      [title, type, comment, location, status, images, videos, createdOn, userId],
    );
    return rows[0];
  }

  static async getRedFlags(userId) {
    const { rows } = await DBConnection.query(
      Queries.incidentTable.allIncident, [userId],
    );

    return rows;
  }

  static async getoneIncident(id) {
    const { rows } = await DBConnection.query(
      Queries.incidentTable.anIncident, [id],
    );

    return rows[0];
  }

  static async getIncidentById(userId, redflagId) {
    const { rows } = await DBConnection.query(
      Queries.incidentTable.oneIncident, [userId, redflagId],
    );

    return rows[0];
  }

  static async editRedFlagLocation(userId, { redFlagId }, { lat, long }) {
    const oneData = await this.getoneIncident(redFlagId);
    if (!oneData) return false;

    const redFlag = await this.getIncidentById(userId, redFlagId);
    if (!redFlag) return 'not-allowed';

    const location = `${lat},${long}`;
    const { rows } = await DBConnection.query(
      Queries.incidentTable.updateLocation, [location, redFlagId],
    );

    return rows[0];
  }

  static async editRedFlagComment(userId, { redFlagId }, { comment }) {
    const oneData = await this.getoneIncident(redFlagId);
    if (!oneData) return false;

    const redFlag = await this.getIncidentById(userId, redFlagId);
    if (!redFlag) return 'not-allowed';

    const { rows } = await DBConnection.query(
      Queries.incidentTable.updateComment, [comment, redFlagId],
    );

    return rows[0];
  }

  static async deleteRedFlag(userId, { redFlagId }) {
    const oneData = await this.getoneIncident(redFlagId);
    if (!oneData) return false;

    const redFlag = await this.getIncidentById(userId, redFlagId);
    if (!redFlag) return 'not-allowed';

    const { rows } = await DBConnection.query(
      Queries.incidentTable.deleteIncident, [redFlagId],
    );

    return rows[0];
  }

  static async editIncidentStatus(userId, { redFlagId }, status) {
    const oneData = await this.getoneIncident(redFlagId);
    if (!oneData) return false;

    const redFlag = await this.getIncidentById(userId, redFlagId);
    if (!redFlag) return 'not-allowed';

    if (status === 'pending') {
      if (redFlag.status === 'draft') {
        const { rows } = await DBConnection.query(
          Queries.incidentTable.updateStatus, [status, redFlagId],
        );
        return rows[0];
      }
    }

    return false;
  }
}

export default User;
