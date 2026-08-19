const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminModel = require('../models/admin.model');
const sendResponse = require('../utils/response');

const JWT_SECRET = process.env.JWT_SECRET || 'bnims_secret_key_change_this_later';

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return sendResponse(res, 400, false, 'Username and password are required');
    }

    const admin = await AdminModel.findByUsername(username);

    if (!admin) {
      return sendResponse(res, 401, false, 'Invalid username or password');
    }

    const passwordMatches = await bcrypt.compare(password, admin.password_hash);

    if (!passwordMatches) {
      return sendResponse(res, 401, false, 'Invalid username or password');
    }

    const token = jwt.sign(
      { admin_id: admin.admin_id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return sendResponse(res, 200, true, 'Login successful', {
      token,
      admin: { admin_id: admin.admin_id, username: admin.username, role: admin.role }
    });
  } catch (error) {
    next(error);
  }
};