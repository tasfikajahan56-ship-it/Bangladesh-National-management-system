const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// Reissue/Correction Request Route
router.post('/', (req, res) => {
    res.json({ message: "Request endpoint working" });
});

// Dashboard Summary Statistics API
router.get('/dashboard-stats', (req, res) => {
    const statsQuery = `
        SELECT 
            (SELECT COUNT(*) FROM CITIZEN) AS total_citizens,
            (SELECT COUNT(*) FROM REISSUE_REQUEST WHERE status = 'Pending') AS pending_requests,
            (SELECT COUNT(*) FROM VERIFICATION_LOG) AS total_verifications;
    `;
    db.query(statsQuery, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

module.exports = router;