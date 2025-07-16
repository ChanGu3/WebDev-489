const {Model, DataTypes} = require('sequelize');

class SavedCard extends Model {
    static async getByEmail(email) {
        return await SavedCard.findAll({
            where: { email: email },
            order: [['isPrimary', 'DESC'], ['createdAt', 'ASC']]
        });
    }

    static async getPrimaryCard(email) {
        return await SavedCard.findOne({
            where: { 
                email: email,
                isPrimary: true
            }
        });
    }

    static async updateById(id, cardData) {
        const card = await SavedCard.findByPk(id);
        if (card) {
            return await card.update(cardData);
        }
        return null;
    }

    static async deleteById(id) {
        const card = await SavedCard.findByPk(id);
        if (card) {
            await card.destroy();
            return true;
        }
        return false;
    }

    static async setAsPrimary(id, email) {
        await SavedCard.update(
            { isPrimary: false },
            { where: { email: email } }
        );
        
        const card = await SavedCard.findByPk(id);
        if (card) {
            return await card.update({ isPrimary: true });
        }
        return null;
    }

    static async getById(id) {
        return await SavedCard.findByPk(id);
    }
}

function SavedCardInit(sequelize) {
    SavedCard.init(
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
            cardType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cardNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            expiryDate: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cardHolderName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isPrimary: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize,
            modelName: 'SavedCard',
            timestamps: true
        }
    );
}

module.exports = { SavedCard, SavedCardInit }; 