const express = require('express');
const router = express.Router();
const fatherController = require('../controllers/father.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/:nid_no', authMiddleware, fatherController.getFatherByCitizenNID);
router.post('/', authMiddleware, fatherController.createFather);
router.put('/:nid_no', authMiddleware, fatherController.updateFather);
router.delete('/:nid_no', authMiddleware, fatherController.deleteFather);

module.exports = router;