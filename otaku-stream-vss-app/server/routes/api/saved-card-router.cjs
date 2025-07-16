const express = require('express');
const router = express.Router();
const { getSavedCards, getPrimaryCard, addCard, updateCard, deleteCard, setPrimaryCard } = require('../../controllers/api-controllers/saved-card-controller.cjs');

// Get all saved cards
router.get('/', getSavedCards);

// Get primary card
router.get('/primary', getPrimaryCard);

// Add new saved card
router.post('/', addCard);

// Update saved card
router.put('/:id', updateCard);

// Delete saved card
router.delete('/:id', deleteCard);

// Set card as primary
router.put('/:id/primary', setPrimaryCard);

module.exports = router; 