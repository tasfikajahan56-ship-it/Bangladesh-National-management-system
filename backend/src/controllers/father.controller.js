const FatherModel = require('../models/father.model');
const sendResponse = require('../utils/response');

exports.getFatherByCitizenNID = async (req, res, next) => {
  try {
    const { nid_no } = req.params;
    const father = await FatherModel.findByCitizenNID(nid_no);

    if (!father) {
      return sendResponse(res, 404, false, 'Father record not found');
    }

    return sendResponse(res, 200, true, 'Father details retrieved', father);
  } catch (error) {
    next(error);
  }
};

exports.createFather = async (req, res, next) => {
  try {
    await FatherModel.create(req.body);
    return sendResponse(res, 201, true, 'Father record added successfully');
  } catch (error) {
    next(error);
  }
};

exports.updateFather = async (req, res, next) => {
  try {
    const { nid_no } = req.params;
    const result = await FatherModel.update(nid_no, req.body);

    if (result.affectedRows === 0) {
      return sendResponse(res, 404, false, 'Father record not found');
    }

    return sendResponse(res, 200, true, 'Father record updated successfully');
  } catch (error) {
    next(error);
  }
};

exports.deleteFather = async (req, res, next) => {
  try {
    const { nid_no } = req.params;
    const result = await FatherModel.delete(nid_no);

    if (result.affectedRows === 0) {
      return sendResponse(res, 404, false, 'Father record not found');
    }

    return sendResponse(res, 200, true, 'Father record deleted successfully');
  } catch (error) {
    next(error);
  }
};