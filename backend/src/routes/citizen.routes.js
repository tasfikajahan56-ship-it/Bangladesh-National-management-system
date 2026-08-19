const express = require('express');
const router = express.Router();
const citizenController = require('../controllers/citizen.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/:nid_no', authMiddleware, citizenController.getCitizenByNID);
router.post('/', authMiddleware, citizenController.createCitizen);
router.put('/:nid_no', authMiddleware, citizenController.updateCitizen);
router.delete('/:nid_no', authMiddleware, citizenController.deleteCitizen);

module.exports = router;