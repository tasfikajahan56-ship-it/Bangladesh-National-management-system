const AuditModel = require('../models/audit.model');

const logAuditTrail = async (nid_no, action, admin_id = 1) => {
  try {
    await AuditModel.logAction(nid_no, action, admin_id);
  } catch (err) {
    console.error('Failed to log audit record:', err.message);
  }
};

module.exports = { logAuditTrail };
