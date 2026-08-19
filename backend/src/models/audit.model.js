const db = require('../../config/db');

class AuditModel {
  static async logAction(nid_no, action, admin_id) {
    const query = `
      INSERT INTO VERIFICATION_LOG (nid_no, action, timestamp, admin_id)
      VALUES (?, ?, NOW(), ?)
    `;
    const [result] = await db.execute(query, [nid_no, action, admin_id]);
    return result;
  }
}

module.exports = AuditModel;
