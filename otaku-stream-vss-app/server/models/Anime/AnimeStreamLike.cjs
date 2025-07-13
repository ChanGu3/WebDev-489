const {Model, DataTypes} = require('sequelize');
const { Logging, errormsg } = require('../../server-logging.cjs');
const { AnimeStream } = require('./AnimeStream.cjs');
const { Member } = require('../Accounts/member.cjs');

class AnimeStreamLike extends Model 
{   
    //
    // Member Exists in DB true otherwise false
    //
    static async #Exists(email, streamID)
    {
       const instance = await AnimeStreamLike.findOne({
            where: {
                email: email,
                streamID: streamID,
            }
       });
       return (instance) ? true : false;
    }

    //
    // reject --> string: error msg
    // resolve --> instance: created AnimeStreamLike
    //
    static AddToDB(email, streamID)
    {
        return new Promise( async (resolve, reject) => {

            if (await this.#Exists(email, streamID))
            {
                Logging.LogWarning(`email, streamID pair exists`);
                reject(new Error(`${email} already has ${streamID} liked`));
                return;
            }

            try
            {
                const newAnimeStreamLike = await AnimeStreamLike.build({
                    email: email,
                    streamID: streamID,
                });

                await newAnimeStreamLike.validate();

                await newAnimeStreamLike.save();

                resolve(newAnimeStreamLike);
            }
            catch(err)
            {
                Logging.LogError(`could not add AnimeStreamLike to database ${email}|${streamID} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    //
    // reject --> string: error msg
    // resolve --> nothing
    //
    static RemoveFromDB(email, streamID)
    {
        return new Promise( async (resolve, reject) => {

            if (!(await this.#Exists(email, streamID)))
            {
                Logging.LogWarning(`email, streamID pair does not exist`);
                reject(new Error(`${email} already does not have ${streamID} liked`));
                return;
            }

            try
            {
                await AnimeStreamLike.destroy({
                    where: {
                        email: email,
                        streamID: streamID,
                    }
                });

                resolve();
            }
            catch(err)
            {
                Logging.LogError(`could not remove AnimeStreamLike from database ${email}|${streamID} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static GetAllByStreamID(streamID)
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                const animeStreamLikes = await AnimeStreamLike.findAll({
                        where: {
                            streamID: streamID,
                        }
                });

                if (animeStreamLikes)
                {
                    resolve(animeStreamLikes.map( (element) => { const {createdAt, updatedAt, ...rest} = element.toJSON(); return rest; }));
                }
                else
                {
                    reject(new Error(`no likes exist for the streamID:${streamID}`));
                }
            }
            catch(err)
            {
                Logging.LogError(`could not get list of animeStreamLikes from database using streamID:${streamID} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static GetByEmailANDStreamID(email, streamID)
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                const animeStreamLikes = await AnimeStreamLike.findOne({
                        where: {
                            email: email,
                            streamID: streamID,
                        }
                });
                if (animeStreamLikes)
                {
                    resolve(animeStreamLikes.toJSON());
                }
                else
                {
                    reject(new Error(`email:${email} doesn't have streamID:${streamID} liked`));
                }
            }
            catch(err)
            {
                Logging.LogError(`could not get animeStreamLike from database using email:${email}|streamID:${streamID} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }
}

function AnimeStreamLikeInit(sequelize)
{
    AnimeStreamLike.init(
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
            streamID: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: AnimeStream,
                    key: 'id',  
                },
                onDelete: 'CASCADE',
            },
        },
        {
            sequelize,
            modelName:`${AnimeStreamLike.name}`,
        }
    )
}

module.exports.AnimeStreamLike = AnimeStreamLike;
module.exports.AnimeStreamLikeInit = AnimeStreamLikeInit;

