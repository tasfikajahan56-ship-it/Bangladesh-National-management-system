const db = require('../../config/db');

class FatherModel {
  static async findByCitizenNID(nid_no) {
    const query = `SELECT * FROM FATHER WHERE nid_no = ?`;
    const [rows] = await db.execute(query, [nid_no]);
    return rows[0];
  }

  static async create(fatherData) {
    const { nid_no, name, nid_ref } = fatherData;
    const query = `
      INSERT INTO FATHER (nid_no, name, nid_ref)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [nid_no, name, nid_ref || null]);
    return result;
  }

  static async update(nid_no, fatherData) {
    const { name, nid_ref } = fatherData;
    const query = `
      UPDATE FATHER SET name = ?, nid_ref = ?
      WHERE nid_no = ?
    `;
    const [result] = await db.execute(query, [name, nid_ref || null, nid_no]);
    return result;
  }

  static async delete(nid_no) {
    const query = `DELETE FROM FATHER WHERE nid_no = ?`;
    const [result] = await db.execute(query, [nid_no]);
    return result;
  }
}

module.exports = FatherModel;