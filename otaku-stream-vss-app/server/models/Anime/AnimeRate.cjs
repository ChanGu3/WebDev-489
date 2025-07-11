const {Model, DataTypes} = require('sequelize');
const { Logging, errormsg } = require('../../server-logging.cjs');
const { Anime } = require('./Anime.cjs');
const { Member } = require('../Accounts/member.cjs');

function AnimeIDRateData(animeRatingList)
{
    const rateData = {}

    rateData.count = animeRatingList.length;
    rateData.rate1Count = 0;
    rateData.rate2Count  = 0;
    rateData.rate3Count  = 0;
    rateData.rate4Count  = 0;
    rateData.rate5Count  = 0;

    let ratingTotal = 0;
    animeRatingList.forEach((element) => {
            ratingTotal = ratingTotal + element.rating;
            rateData[`rate${element.rating}Count`] = rateData[`rate${element.rating}Count`] + 1;
            rateData.count = rateData.count + 1;
    });

    if(animeRatingList.length > 0)
    {
        rateData.avg = (ratingTotal/animeRatingList.length);
    }
    else
    {
        rateData.avg = 0;
    }

    return rateData;
}

class AnimeRate extends Model 
{   
    //
    // Member Exists in DB true otherwise false
    //
    static async #Exists(email, animeID)
    {
       const instance = await AnimeRate.findOne({
            where: {
                email: email,
                animeID: animeID,
            }
       });
       return (instance) ? true : false;
    }

    //
    //
    // reject --> string: error msg
    // resolve --> instance: created Member
    //
    // rating must be a INTEGER within [1,5]
    static AddToDB(email, animeID, rating)
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
                const newAnimeRate = await AnimeRate.build({
                    email: email,
                    animeID: animeID,
                    rating: rating,
                });

                await newAnimeRate.validate();

                await newAnimeRate.save();

                resolve(newAnimeRate);
            }
            catch(err)
            {
                Logging.LogError(`could not add  AnimeRate to database ${email}|${animeID} --- ${err.message}`);
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
                reject(new Error(`${email} already does not have a rating for ${animeID}`));
                return;
            }

            try
            {
                await AnimeRate.destroy({
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

    static GetAllByAnimeID(animeID)
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                const animeRates = await AnimeRate.findAll({
                        where: {
                            animeID: animeID,
                        }
                });
                resolve(animeRates.map((element) => { return element.toJSON() }));
            }
            catch(err)
            {
                Logging.LogError(`could not get list of AnimeRates from database using animeID:${animeID} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static async GetAnimeIDRatingData(animeID)
    {
        try
        {
            const animeRatingList = await this.GetAllByAnimeID(animeID);
            return AnimeIDRateData(animeRatingList);
        }
        catch(err)
        {
            Logging.LogError(`could not get rating info from animeID:${animeID} --- ${err.message}`);
            throw new Error(errormsg.fallback);
        }
    }
}

function AnimeRateInit(sequelize)
{
    AnimeRate.init(
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
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5,
                }
            }
        },
        {
            sequelize,
            modelName:`${AnimeRate.name}`,
        }
    )
}

module.exports.AnimeRate = AnimeRate;
module.exports.AnimeRateInit = AnimeRateInit;

