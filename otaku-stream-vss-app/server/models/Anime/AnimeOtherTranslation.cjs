const {Model, DataTypes} = require('sequelize');
const { Logging, errormsg } = require('../../server-logging.cjs');
const { Anime } = require('./Anime.cjs');
const { default: e } = require('express');

class AnimeOtherTranslation extends Model 
{   
    //
    // Member Exists in DB true otherwise false
    //
    static async #Exists(animeID, translation, transaction = null)
    {
       const instance = await AnimeOtherTranslation.findOne({
            where: {
                animeID: animeID,
                translation: translation,
            },
            transaction
       });
       return (instance) ? true : false;
    }

    //
    // reject --> string: error msg
    // resolve --> instance: created Member
    //
    static AddToDB(animeID, translation, transaction = null)
    {
        return new Promise( async (resolve, reject) => {

            if (await this.#Exists(animeID, translation, transaction))
            {
                Logging.LogWarning(`animeID & translation pair exists`);
                reject(new Error(`anime already has this translation`));
                return;
            }

            try
            {
                const newAnimeOtherTranslation = await AnimeOtherTranslation.build({
                    animeID: animeID,
                    translation: translation,
                });

                await newAnimeOtherTranslation.validate();

                if (transaction)
                {
                    await newAnimeOtherTranslation.save({transaction});
                }
                else
                {
                    await newAnimeOtherTranslation.save();
                }

                resolve(newAnimeOtherTranslation);
            }
            catch(err)
            {
                Logging.LogError(`could not add AnimeOtherTranslation to database ${animeID}|${translation} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    //
    // reject --> string: error msg
    // resolve --> nothing
    //
    static RemoveFromDB(animeID, translation)
    {
        return new Promise( async (resolve, reject) => {

            if (!(await this.#Exists(animeID, translation)))
            {
                Logging.LogWarning(`animeID &translation pair does not exist exists`);
                reject(new Error(`${animeID} is already not having ${translation} not as a translation`));
                return;
            }

            try
            {
                await AnimeOtherTranslation.destroy({
                    where: {
                        animeID: animeID,
                        translation: translation,
                    }
                });

                resolve();
            }
            catch(err)
            {
                Logging.LogError(`could not remove AnimeOtherTranslation from database ${animeID}|${translation} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }


    //
    // reject --> string: error msg
    // resolve --> nothing
    //
    static RemoveAllByAnimeIDFromDB(animeID, transaction = null)
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                const query = {}
                query.where = {}
                query.where.animeID = animeID;
                if(transaction)
                {
                    query.transaction = transaction;
                }

                const deleted = await AnimeOtherTranslation.destroy(query);
                resolve();
            }
            catch(err)
            {
                Logging.LogError(`could not remove all AnimeOtherTranslation from database by ${animeID} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static GetAllByAnimeID(animeID)
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                const animeOtherTranslations = await AnimeOtherTranslation.findAll({
                        where: {
                            animeID: animeID,
                        }
                    });
                resolve(animeOtherTranslations.map((element) => { const {animeID, createdAt, updatedAt, ...rest} = element.toJSON(); return rest; }));
            }
            catch(err)
            {
                Logging.LogError(`could not get list of AnimeOtherTranslations from database using animeID:${animeID} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static GetAllByGenre(translation)
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                const animeOtherTranslations = await AnimeOtherTranslation.findAll({
                        where: {
                            translation:translation,
                        }
                    });
                resolve(animeOtherTranslations);
            }
            catch(err)
            {
                Logging.LogError(`could not get list of AnimeOtherTranslations from database using translation:${translation} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static GetByAnimeTranslation(animeID, translation)
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                if (await this.#Exists(animeID, translation))
                {
                    const animeGenre = await AnimeOtherTranslation.findOne({
                        where: {
                            animeID: animeID,
                            translation: translation,
                        }
                    });
                    resolve(animeGenre);
                }
                else
                {
                    Logging.LogWarning(`AnimeOtherTranslation does not exist ${animeID}|${translation} --- ${err.message}`);
                    reject(new Error(errormsg.animeOtherTranslationDoesNotExist));
                }
            }
            catch(err)
            {
                Logging.LogError(`could not get AnimeOtherTranslation from database ${animeID}|${translation} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }
}

function AnimeOtherTranslationInit(sequelize)
{
    AnimeOtherTranslation.init(
        {
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
            translation: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            sequelize,
            modelName:`${AnimeOtherTranslation.name}`,
        }
    )
}

module.exports.AnimeOtherTranslation = AnimeOtherTranslation;
module.exports.AnimeOtherTranslationInit = AnimeOtherTranslationInit;

