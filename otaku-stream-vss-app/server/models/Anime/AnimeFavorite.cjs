const {Model, DataTypes} = require('sequelize');
const { Logging, errormsg } = require('../../server-logging.cjs');
const { Anime } = require('./Anime.cjs');
const { Member } = require('../Accounts/member.cjs');

class AnimeFavorite extends Model 
{   
    //
    // Member Exists in DB true otherwise false
    //
    static async #Exists(email, animeID)
    {
       const instance = await AnimeFavorite.findOne({
            where: {
                email: email,
                animeID: animeID,
            }
       });
       return (instance) ? true : false;
    }

    //
    // reject --> string: error msg
    // resolve --> instance: created AnimeFavorite
    //
    static AddToDB(email, animeID)
    {
        return new Promise( async (resolve, reject) => {

            if (await this.#Exists(email, animeID))
            {
                Logging.LogWarning(`email & animeID pair exists`);
                reject(new Error(`${email} already has this ${animeID}`));
                return;
            }

            try
            {
                const newAnimeFavorite = await AnimeFavorite.build({
                    email: email,
                    animeID: animeID,
                });

                await newAnimeFavorite.validate();

                await newAnimeFavorite.save();

                resolve(newAnimeFavorite);
            }
            catch(err)
            {
                Logging.LogError(`could not add AnimeFavorite to database ${email}|${animeID} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    //
    // reject --> string: error msg
    // resolve --> nothing
    //
    static RemoveFromDB(email, animeID)
    {
        return new Promise( async (resolve, reject) => {

            if (!(await this.#Exists(email, animeID)))
            {
                Logging.LogWarning(`email & animeID pair does not exist`);
                reject(new Error(`${email} is already not having ${animeID} as a favorite`));
                return;
            }

            try
            {
                await AnimeFavorite.destroy({
                    where: {
                        email: email,
                        animeID: animeID,
                    }
                });

                resolve();
            }
            catch(err)
            {
                Logging.LogError(`could not remove AnimeFavorite from database ${email}|${animeID} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static GetByEmailANDID(email, animeID)
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                const animeFavorites = await AnimeFavorite.findOne({
                        where: {
                            email: email,
                            animeID: animeID,
                        }
                });

                if(animeFavorites)
                {
                    resolve(animeFavorites.toJSON());
                }
                else
                {
                    reject(new Error(`Does Not Exist In Database email:${email}|animeID:${animeID}`));
                }
            }
            catch(err)
            {
                Logging.LogError(`could not get AnimeFavorite from database using email:${email}|animeID:${animeID} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static GetAllByEmail(email)
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                const animeFavorites = await AnimeFavorite.findAll({
                        where: {
                            email: email,
                        }
                });
                resolve(animeFavorites.map( (element) => { const {createdAt, updatedAt, ...rest} = element.toJSON(); return rest; }));
            }
            catch(err)
            {
                Logging.LogError(`could not get list of AnimeFavorites from database using email:${email} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }
}

function AnimeFavoriteInit(sequelize)
{
    AnimeFavorite.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: Member,
                    key: 'email',  
                },
                onDelete: 'CASCADE',
            },
            animeID: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: Anime,
                    key: 'id',  
                },
                onDelete: 'CASCADE',
            },
        },
        {
            sequelize,
            modelName:`${AnimeFavorite.name}`,
        }
    )
}

module.exports.AnimeFavorite = AnimeFavorite;
module.exports.AnimeFavoriteInit = AnimeFavoriteInit;

