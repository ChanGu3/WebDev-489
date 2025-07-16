const { SavedCard } = require('../../models/SavedCard.cjs');
const { Logging } = require('../../server-logging.cjs');

async function getSavedCards(req, res) {
    try {
        const memberEmail = req.session.user.email;
        
        if (!memberEmail) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const cards = await SavedCard.getByEmail(memberEmail);
        
        res.json({
            success: true,
            cards: cards
        });
    } catch (error) {
        console.error('Error getting saved cards:', error);
        res.status(500).json({ error: 'Failed to get saved cards' });
    }
}

async function getPrimaryCard(req, res) {
    try {
        const memberEmail = req.session.user.email;
        
        if (!memberEmail) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const primaryCard = await SavedCard.getPrimaryCard(memberEmail);
        
        res.json({
            success: true,
            primaryCard: primaryCard
        });
    } catch (error) {
        console.error('Error getting primary card:', error);
        res.status(500).json({ error: 'Failed to get primary card' });
    }
}

async function addCard(req, res) {
    try {
        const memberEmail = req.session.user.email;
        const { cardType, cardNumber, expiryDate, cardHolderName, isPrimary } = req.body;
        
        if (!memberEmail) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        if (!cardType || !cardNumber || !expiryDate || !cardHolderName) {
            return res.status(400).json({ error: 'All card fields are required' });
        }

        const card = await SavedCard.createCard({
            email: memberEmail,
            cardType,
            cardNumber,
            expiryDate,
            cardHolderName,
            isPrimary: isPrimary || false
        });
        
        res.json({
            success: true,
            card: card
        });
    } catch (error) {
        console.error('Error adding card:', error);
        res.status(500).json({ error: 'Failed to add card' });
    }
}

async function updateCard(req, res) {
    try {
        const memberEmail = req.session.user.email;
        const { id } = req.params;
        const { cardType, cardNumber, expiryDate, cardHolderName, isPrimary } = req.body;
        
        if (!memberEmail) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        if (!id) {
            return res.status(400).json({ error: 'Card ID is required' });
        }

        const card = await SavedCard.getById(id);
        if (!card || card.email !== memberEmail) {
            return res.status(404).json({ error: 'Card not found' });
        }

        const updatedCard = await SavedCard.updateById(id, {
            cardType,
            cardNumber,
            expiryDate,
            cardHolderName,
            isPrimary
        });
        
        res.json({
            success: true,
            card: updatedCard
        });
    } catch (error) {
        console.error('Error updating card:', error);
        res.status(500).json({ error: 'Failed to update card' });
    }
}

async function deleteCard(req, res) {
    try {
        const memberEmail = req.session.user.email;
        const { id } = req.params;
        
        if (!memberEmail) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        if (!id) {
            return res.status(400).json({ error: 'Card ID is required' });
        }

        const card = await SavedCard.getById(id);
        if (!card || card.email !== memberEmail) {
            return res.status(404).json({ error: 'Card not found' });
        }

        const deleted = await SavedCard.deleteById(id);
        
        res.json({
            success: true,
            message: 'Card deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ error: 'Failed to delete card' });
    }
}

async function setPrimaryCard(req, res) {
    try {
        const memberEmail = req.session.user.email;
        const { id } = req.params;
        
        if (!memberEmail) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        if (!id) {
            return res.status(400).json({ error: 'Card ID is required' });
        }

        const card = await SavedCard.getById(id);
        if (!card || card.email !== memberEmail) {
            return res.status(404).json({ error: 'Card not found' });
        }

        const primaryCard = await SavedCard.setAsPrimary(id, memberEmail);
        
        res.json({
            success: true,
            primaryCard: primaryCard
        });
    } catch (error) {
        console.error('Error setting primary card:', error);
        res.status(500).json({ error: 'Failed to set primary card' });
    }
}

module.exports = {
    getSavedCards,
    getPrimaryCard,
    addCard,
    updateCard,
    deleteCard,
    setPrimaryCard
}; 