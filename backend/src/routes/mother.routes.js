const express = require('express');
const router = express.Router();
const motherController = require('../controllers/mother.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/:nid_no', authMiddleware, motherController.getMotherByCitizenNID);
router.post('/', authMiddleware, motherController.createMother);
router.put('/:nid_no', authMiddleware, motherController.updateMother);
router.delete('/:nid_no', authMiddleware, motherController.deleteMother);

module.exports = router;