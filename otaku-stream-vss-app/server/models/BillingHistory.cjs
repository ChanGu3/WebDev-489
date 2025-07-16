const {Model, DataTypes} = require('sequelize');

class BillingHistory extends Model {
    static async getByEmail(email, limit = 10) {
        const billingHistory = await BillingHistory.findAll({
            where: { email: email },
            order: [['billing_date', 'DESC']],
            limit: limit
        });
        return billingHistory;
    }

    static async getAllByEmail(email) {
        const billingHistory = await BillingHistory.findAll({
            where: { email: email },
            order: [['billing_date', 'DESC']]
        });
        return billingHistory;
    }

    static async getById(id) {
        return await BillingHistory.findByPk(id);
    }

    static async update(id, billingData) {
        const billing = await BillingHistory.findByPk(id);
        if (billing) {
            return await billing.update(billingData);
        }
        return null;
    }

    static async delete(id) {
        const billing = await BillingHistory.findByPk(id);
        if (billing) {
            await billing.destroy();
            return true;
        }
        return false;
    }

    static async getMonthlyBilling(email, year, month) {
        const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
        const endDate = `${year}-${month.toString().padStart(2, '0')}-31`;
        
        const billingHistory = await BillingHistory.findAll({
            where: { 
                email: email,
                billing_date: {
                    [require('sequelize').Op.between]: [startDate, endDate]
                }
            },
            order: [['billing_date', 'DESC']]
        });
        return billingHistory;
    }
}

function BillingHistoryInit(sequelize) {
    BillingHistory.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'Members',
                    key: 'email'
                }
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            payment_method: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: 'Paid'
            },
            billing_date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'BillingHistory',
            timestamps: true
        }
    );
}

module.exports = { BillingHistory, BillingHistoryInit }; 