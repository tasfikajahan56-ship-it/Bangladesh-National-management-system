const db = require('../../config/db');

class AdminModel {
  static async findByUsername(username) {
    const query = `SELECT * FROM ADMIN_USER WHERE username = ?`;
    const [rows] = await db.execute(query, [username]);
    return rows[0];
  }
}

module.exports = AdminModel;