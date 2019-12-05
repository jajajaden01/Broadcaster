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
}

export default User;
