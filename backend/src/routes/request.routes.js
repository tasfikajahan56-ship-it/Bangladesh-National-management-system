const express = require('express');
const router = express.Router();

// Reissue/Correction Request Route
router.post('/', (req, res) => {
    res.json({ message: "Request endpoint working" });
});

module.exports = router;