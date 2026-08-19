const db = require('../../config/db');

class CitizenModel {
  static async findByNID(nid_no) {
    const query = `
      SELECT c.*, 
             a.details AS present_address, 
             u.name AS upazila_name, 
             d.name AS district_name, 
             dv.name AS division_name
      FROM CITIZEN c
      LEFT JOIN ADDRESS a ON c.nid_no = a.nid_no
      LEFT JOIN UPAZILA u ON a.upazila_id = u.upazila_id
      LEFT JOIN DISTRICT d ON u.district_id = d.district_id
      LEFT JOIN DIVISION dv ON d.division_id = dv.division_id
      WHERE c.nid_no = ?
    `;
    const [rows] = await db.execute(query, [nid_no]);
    return rows[0];
  }

  static async create(citizenData) {
    const { nid_no, full_name, dob, gender, blood_group, marital_status } = citizenData;
    const query = `
      INSERT INTO CITIZEN (nid_no, full_name, dob, gender, blood_group, marital_status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [nid_no, full_name, dob, gender, blood_group, marital_status]);
    return result;
  }
}

module.exports = CitizenModel;