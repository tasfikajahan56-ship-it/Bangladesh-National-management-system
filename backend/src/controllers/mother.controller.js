const MotherModel = require('../models/mother.model');
const sendResponse = require('../utils/response');

exports.getMotherByCitizenNID = async (req, res, next) => {
  try {
    const { nid_no } = req.params;
    const mother = await MotherModel.findByCitizenNID(nid_no);

    if (!mother) {
      return sendResponse(res, 404, false, 'Mother record not found');
    }

    return sendResponse(res, 200, true, 'Mother details retrieved', mother);
  } catch (error) {
    next(error);
  }
};

exports.createMother = async (req, res, next) => {
  try {
    await MotherModel.create(req.body);
    return sendResponse(res, 201, true, 'Mother record added successfully');
  } catch (error) {
    next(error);
  }
};

exports.updateMother = async (req, res, next) => {
  try {
    const { nid_no } = req.params;
    const result = await MotherModel.update(nid_no, req.body);

    if (result.affectedRows === 0) {
      return sendResponse(res, 404, false, 'Mother record not found');
    }

    return sendResponse(res, 200, true, 'Mother record updated successfully');
  } catch (error) {
    next(error);
  }
};

exports.deleteMother = async (req, res, next) => {
  try {
    const { nid_no } = req.params;
    const result = await MotherModel.delete(nid_no);

    if (result.affectedRows === 0) {
      return sendResponse(res, 404, false, 'Mother record not found');
    }

    return sendResponse(res, 200, true, 'Mother record deleted successfully');
  } catch (error) {
    next(error);
  }
};