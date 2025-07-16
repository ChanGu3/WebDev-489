const { Premium } = require('../../models/Premium.cjs');
const { Logging } = require('../../server-logging.cjs');
const { SavedCard } = require('../../models/SavedCard.cjs');
const { BillingHistory } = require('../../models/BillingHistory.cjs');

async function getPremiumStatus(req, res) {
    try {
        const memberEmail = req.session.user.email;
        
        if (!memberEmail) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const premium = await Premium.getByEmail(memberEmail);
        const isPremium = await Premium.isPremium(memberEmail);
        
        res.json({
            success: true,
            isPremium: isPremium,
            premium: premium
        });
    } catch (error) {
        console.error('Error getting premium status:', error);
        res.status(500).json({ error: 'Failed to get premium status' });
    }
}

async function createPremium(req, res) {
    try {
        const memberEmail = req.session.user.email;
        const { expDate } = req.body;
        
        if (!memberEmail) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        if (!expDate) {
            return res.status(400).json({ error: 'Expiration date is required' });
        }

        const existingPremium = await Premium.getByEmail(memberEmail);
        if (existingPremium) {
            return res.status(400).json({ error: 'Premium subscription already exists' });
        }

        const premium = await Premium.createPremium({
            email: memberEmail,
            expDate: expDate
        });
        
        res.json({
            success: true,
            premium: premium
        });
    } catch (error) {
        console.error('Error creating premium subscription:', error);
        res.status(500).json({ error: 'Failed to create premium subscription' });
    }
}

async function updatePremium(req, res) {
    try {
        const memberEmail = req.session.user.email;
        const { expDate } = req.body;
        
        if (!memberEmail) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        if (!expDate) {
            return res.status(400).json({ error: 'Expiration date is required' });
        }

        const premium = await Premium.updateByEmail(memberEmail, { expDate });
        
        if (!premium) {
            return res.status(404).json({ error: 'Premium subscription not found' });
        }
        
        res.json({
            success: true,
            premium: premium
        });
    } catch (error) {
        console.error('Error updating premium subscription:', error);
        res.status(500).json({ error: 'Failed to update premium subscription' });
    }
}

async function deletePremium(req, res) {
    try {
        const memberEmail = req.session.user.email;
        
        if (!memberEmail) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const deleted = await Premium.deleteByEmail(memberEmail);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Premium subscription not found' });
        }
        
        res.json({
            success: true,
            message: 'Premium subscription deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting premium subscription:', error);
        res.status(500).json({ error: 'Failed to delete premium subscription' });
    }
}

async function upgradeToPremium(req, res) {
    try {
        const memberEmail = req.session?.user?.email;
        if (!memberEmail) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const primaryCard = await SavedCard.getPrimaryCard(memberEmail);
        if (!primaryCard) {
            return res.status(400).json({ error: 'No primary card found' });
        }

        const now = new Date();
        const expDate = new Date(now);
        expDate.setMonth(expDate.getMonth() + 1);
        let premium = await Premium.getByEmail(memberEmail);
        if (premium) {
            await premium.update({ expDate });
        } else {
            premium = await Premium.create({ email: memberEmail, expDate });
        }

        await BillingHistory.create({
            email: memberEmail,
            description: 'Premium Membership Upgrade',
            amount: 9.99,
            payment_method: primaryCard.cardType + ' ****' + primaryCard.cardNumber.slice(-4),
            status: 'Paid',
            billing_date: now
        });

        res.json({ success: true, premium });
    } catch (error) {
        console.error('Error upgrading to premium:', error);
        res.status(500).json({ error: 'Failed to upgrade to premium' });
    }
}

module.exports = {
    getPremiumStatus,
    createPremium,
    updatePremium,
    deletePremium,
    upgradeToPremium
}; 