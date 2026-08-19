const db = require('../../config/db');

class SpouseModel {
  static async findByCitizenNID(nid_no) {
    const query = `SELECT * FROM SPOUSE WHERE nid_no = ?`;
    const [rows] = await db.execute(query, [nid_no]);
    return rows[0];
  }

  static async create(spouseData) {
    const { nid_no, name, nid_ref } = spouseData;
    const query = `
      INSERT INTO SPOUSE (nid_no, name, nid_ref)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [nid_no, name, nid_ref || null]);
    return result;
  }

  static async update(nid_no, spouseData) {
    const { name, nid_ref } = spouseData;
    const query = `
      UPDATE SPOUSE SET name = ?, nid_ref = ?
      WHERE nid_no = ?
    `;
    const [result] = await db.execute(query, [name, nid_ref || null, nid_no]);
    return result;
  }

  static async delete(nid_no) {
    const query = `DELETE FROM SPOUSE WHERE nid_no = ?`;
    const [result] = await db.execute(query, [nid_no]);
    return result;
  }
}

module.exports = SpouseModel;