const SpouseModel = require('../models/spouse.model');
const sendResponse = require('../utils/response');

exports.getSpouseByCitizenNID = async (req, res, next) => {
  try {
    const { nid_no } = req.params;
    const spouse = await SpouseModel.findByCitizenNID(nid_no);

    if (!spouse) {
      return sendResponse(res, 404, false, 'Spouse record not found');
    }

    return sendResponse(res, 200, true, 'Spouse details retrieved', spouse);
  } catch (error) {
    next(error);
  }
};

exports.createSpouse = async (req, res, next) => {
  try {
    await SpouseModel.create(req.body);
    return sendResponse(res, 201, true, 'Spouse record added successfully');
  } catch (error) {
    next(error);
  }
};

exports.updateSpouse = async (req, res, next) => {
  try {
    const { nid_no } = req.params;
    const result = await SpouseModel.update(nid_no, req.body);

    if (result.affectedRows === 0) {
      return sendResponse(res, 404, false, 'Spouse record not found');
    }

    return sendResponse(res, 200, true, 'Spouse record updated successfully');
  } catch (error) {
    next(error);
  }
};

exports.deleteSpouse = async (req, res, next) => {
  try {
    const { nid_no } = req.params;
    const result = await SpouseModel.delete(nid_no);

    if (result.affectedRows === 0) {
      return sendResponse(res, 404, false, 'Spouse record not found');
    }

    return sendResponse(res, 200, true, 'Spouse record deleted successfully');
  } catch (error) {
    next(error);
  }
};