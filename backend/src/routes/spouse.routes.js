const express = require('express');
const router = express.Router();
const spouseController = require('../controllers/spouse.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/:nid_no', authMiddleware, spouseController.getSpouseByCitizenNID);
router.post('/', authMiddleware, spouseController.createSpouse);
router.put('/:nid_no', authMiddleware, spouseController.updateSpouse);
router.delete('/:nid_no', authMiddleware, spouseController.deleteSpouse);

module.exports = router;