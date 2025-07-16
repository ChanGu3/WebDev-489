const {Model, DataTypes} = require('sequelize');

class Premium extends Model {
    static async getByEmail(email) {
        return await Premium.findOne({
            where: { email: email }
        });
    }

    static async updateByEmail(email, premiumData) {
        const premium = await Premium.findOne({
            where: { email: email }
        });
        if (premium) {
            return await premium.update(premiumData);
        }
        return null;
    }

    static async deleteByEmail(email) {
        const premium = await Premium.findOne({
            where: { email: email }
        });
        if (premium) {
            await premium.destroy();
            return true;
        }
        return false;
    }

    static async isPremium(email) {
        const premium = await this.getByEmail(email);
        if (!premium) return false;
        
        const expDate = new Date(premium.expDate);
        const now = new Date();
        return expDate > now;
    }

    static async getExpiredPremiums() {
        const now = new Date();
        return await Premium.findAll({
            where: {
                expDate: {
                    [require('sequelize').Op.lt]: now
                }
            }
        });
    }
}

function PremiumInit(sequelize) {
    Premium.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                references: {
                    model: 'Members',
                    key: 'email'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            expDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Premium',
            timestamps: true
        }
    );
}

module.exports = { Premium, PremiumInit }; 