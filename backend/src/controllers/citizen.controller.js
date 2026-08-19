const CitizenModel = require('../models/citizen.model');
const { logAuditTrail } = require('../utils/logger');
const sendResponse = require('../utils/response');

exports.getCitizenByNID = async (req, res, next) => {
  try {
    const { nid_no } = req.params;
    const citizen = await CitizenModel.findByNID(nid_no);

    if (!citizen) {
      return sendResponse(res, 404, false, 'Citizen record not found');
    }

    // Log this lookup action for audit compliance
    await logAuditTrail(nid_no, 'VERIFY_SEARCH', req.user?.admin_id || 1);

    return sendResponse(res, 200, true, 'Citizen details retrieved', citizen);
  } catch (error) {
    next(error);
  }
};

exports.createCitizen = async (req, res, next) => {
  try {
    await CitizenModel.create(req.body);
    await logAuditTrail(req.body.nid_no, 'INSERT_CITIZEN', req.user?.admin_id || 1);

    return sendResponse(res, 201, true, 'Citizen registered successfully');
  } catch (error) {
    next(error);
  }
};
