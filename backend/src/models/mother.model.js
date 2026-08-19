const db = require('../../config/db');

class MotherModel {
  static async findByCitizenNID(nid_no) {
    const query = `SELECT * FROM MOTHER WHERE nid_no = ?`;
    const [rows] = await db.execute(query, [nid_no]);
    return rows[0];
  }

  static async create(motherData) {
    const { nid_no, name, nid_ref } = motherData;
    const query = `
      INSERT INTO MOTHER (nid_no, name, nid_ref)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [nid_no, name, nid_ref || null]);
    return result;
  }

  static async update(nid_no, motherData) {
    const { name, nid_ref } = motherData;
    const query = `
      UPDATE MOTHER SET name = ?, nid_ref = ?
      WHERE nid_no = ?
    `;
    const [result] = await db.execute(query, [name, nid_ref || null, nid_no]);
    return result;
  }

  static async delete(nid_no) {
    const query = `DELETE FROM MOTHER WHERE nid_no = ?`;
    const [result] = await db.execute(query, [nid_no]);
    return result;
  }
}

module.exports = MotherModel;