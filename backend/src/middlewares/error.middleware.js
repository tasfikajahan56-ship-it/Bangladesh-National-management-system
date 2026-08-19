const sendResponse = require('../utils/response');

module.exports = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  return sendResponse(res, status, false, message);
};
