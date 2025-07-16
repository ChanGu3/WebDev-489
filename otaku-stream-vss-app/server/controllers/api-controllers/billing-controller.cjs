const { BillingHistory } = require('../../models/BillingHistory.cjs');
const { Logging } = require('../../server-logging.cjs');

async function getRecentBilling(req, res) {
    try {
        const memberEmail = req.session.user.email;
        
        if (!memberEmail) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const billingHistory = await BillingHistory.getByEmail(memberEmail, 5);
        
        res.json({
            success: true,
            billingHistory: billingHistory
        });
    } catch (error) {
        console.error('Error getting recent billing history:', error);
        res.status(500).json({ error: 'Failed to get billing history' });
    }
}

async function getAllBilling(req, res) {
    try {
        const memberEmail = req.session.user.email;
        
        if (!memberEmail) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const billingHistory = await BillingHistory.getAllByEmail(memberEmail);
        
        res.json({
            success: true,
            billingHistory: billingHistory
        });
    } catch (error) {
        console.error('Error getting all billing history:', error);
        res.status(500).json({ error: 'Failed to get billing history' });
    }
}

async function getMonthlyBilling(req, res) {
    try {
        const memberEmail = req.session.user.email;
        const { year, month } = req.query;
        
        if (!memberEmail) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        if (!year || !month) {
            return res.status(400).json({ error: 'Year and month are required' });
        }

        const billingHistory = await BillingHistory.getMonthlyBilling(memberEmail, parseInt(year), parseInt(month));
        
        res.json({
            success: true,
            billingHistory: billingHistory
        });
    } catch (error) {
        console.error('Error getting monthly billing history:', error);
        res.status(500).json({ error: 'Failed to get monthly billing history' });
    }
}

module.exports = {
    getRecentBilling,
    getAllBilling,
    getMonthlyBilling
}; 