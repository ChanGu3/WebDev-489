const express = require('express');
const router = express.Router();
const { getPremiumStatus, createPremium, updatePremium, deletePremium, upgradeToPremium } = require('../../controllers/api-controllers/premium-controller.cjs');

// Get premium status
router.get('/status', getPremiumStatus);

// Create premium subscription
router.post('/', createPremium);

// Update premium subscription
router.put('/', updatePremium);

// Delete premium subscription
router.delete('/', deletePremium);

// POST /api/premium/upgrade
router.post('/upgrade', upgradeToPremium);

module.exports = router; 