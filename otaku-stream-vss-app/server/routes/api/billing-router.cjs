const express = require('express');
const router = express.Router();
const { getRecentBilling, getAllBilling, getMonthlyBilling } = require('../../controllers/api-controllers/billing-controller.cjs');

// Get recent billing history
router.get('/recent', getRecentBilling);

// Get all billing history
router.get('/all', getAllBilling);

// Get all billing history (alias for /all)
router.get('/history', getAllBilling);

// Get monthly billing
router.get('/monthly', getMonthlyBilling);

module.exports = router; 