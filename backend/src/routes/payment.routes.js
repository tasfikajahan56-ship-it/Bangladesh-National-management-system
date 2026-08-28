const express = require('express');
const router = express.Router();

// Payment Route
router.post('/', (req, res) => {
    res.json({ message: "Payment endpoint working" });
});

module.exports = router;