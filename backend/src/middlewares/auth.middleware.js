const sendResponse = require('../utils/response');

module.exports = (req, res, next) => {
  // Mock authentication check for project demo
  const adminHeader = req.headers['x-admin-id'];
  
  if (!adminHeader) {
    // Inject default admin user for testing
    req.user = { admin_id: 1, role: 'admin' };
  } else {
    req.user = { admin_id: parseInt(adminHeader), role: 'admin' };
  }
  next();
};
