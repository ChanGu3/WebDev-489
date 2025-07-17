const {Model, DataTypes, Sequelize} = require('sequelize');
const { Logging, errormsg } = require('../../server-logging.cjs');
const { Anime } = require('./Anime.cjs');
const { AnimeStream } = require('./AnimeStream.cjs');
const { Member } = require('../Accounts/member.cjs');

class AnimeWatchHistory extends Model 
{   
    //
    // Member Exists in DB true otherwise false
    //
    static async Exists(email, streamID)
    {
       const instance = await AnimeWatchHistory.findOne({
            where: {
                email: email,
                streamID: streamID,
            }
       });
       return (instance) ? true : false;
    }

    //
    // reject --> string: error msg
    // resolve --> instance: created AnimeWatchHistory
    //
    static AddToDB(email, streamID)
    {
        return new Promise( async (resolve, reject) => {

            if (await this.Exists(email, streamID))
            {
                Logging.LogWarning(`email, streamID pair exists`);
                reject(new Error(`${email} already has ${streamID} added`));
                return;
            }

            try
            {
                const newAnimeWatchHistory = await AnimeWatchHistory.build({
                    email: email,
                    streamID: streamID,
                });

                await newAnimeWatchHistory.validate();

                await newAnimeWatchHistory.save();

                resolve(newAnimeWatchHistory);
            }
            catch(err)
            {
                Logging.LogError(`could not add newAnimeWatchHistory to database ${email}|${streamID} --- ${err.message}`);
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

            if (!(await this.Exists(email, streamID)))
            {
                Logging.LogWarning(`email, streamID, pair does not exist`);
                reject(new Error(`${email} has not watched stream of anime with id:${streamID}`));
                return;
            }

            try
            {
                await AnimeWatchHistory.destroy({
                    where: {
                        email: email,
                        streamID: streamID,
                    }
                });

                resolve();
            }
            catch(err)
            {
                Logging.LogError(`could not remove AnimeWatchHistory from database ${email}|${streamID} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    //
    // reject --> string: error msg
    // resolve --> instance: updated AnimeWatchHistory
    //
    static UpdateDB(email, streamID)
    {
        return new Promise( async (resolve, reject) => {

            try
            {
                if (await this.Exists(email, streamID))
                {
                    await AnimeWatchHistory.update(
                        { 
                            dateStartedWatching: new Date(),
                        },    
                        {
                            where: {
                                email: email,
                                streamID: streamID,
                            }
                        },
                    );

                }
                else
                {
                    Logging.LogError(`could not update date of AnimeWatchHistoryRow with streamID:${streamID} does not exist`);
                    reject(new Error(`could not update date of AnimeWatchHistoryRow with streamID:${streamID} does not exist`));
                }

                resolve();
            }
            catch(err)
            {
                Logging.LogError(`could not update date of AnimeWatchHistoryRow with streamID:${streamID} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        });
    }

    static GetWatchHistoryByEmail(email, { byWatchDate = false, latestStreamPerSeries = false, animeID = false} = {})
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                const query = {}
                query.attributes = ['streamID'];
                query.where = { email: email };
                query.include = [ // inner join (I NEED TO GET ALL THAT )
                    {
                        model: AnimeStream,
                        required: true,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
                    }
                ];
                if(animeID)
                {
                    query.include[0].where = { animeID: animeID };
                }
                let orderList = (byWatchDate) ? ['dateStartedWatching', 'DESC'] : undefined;
                if (latestStreamPerSeries)
                {
                    orderList = ['dateStartedWatching', 'DESC'];
                    query.attributes.push([Sequelize.fn('MAX', Sequelize.col('dateStartedWatching')), 'dateStartedWatching']);
                    query.group = ['animeID']
                }
                else
                {
                    query.attributes.push('dateStartedWatching');
                }
                if(orderList)
                {
                    query.order = [orderList];
                }
                const animeWatchHistory = await AnimeWatchHistory.findAll(query);
                resolve(animeWatchHistory.map( (element) => { 
                        const {streamID, dateStartedWatching, AnimeStream} = element.toJSON(); 
                        const data = {streamID, dateStartedWatching, ...AnimeStream}
                        return data; 
                }));
            }
            catch(err)
            {
                Logging.LogError(`could not get list of animeWatchHistory from database by using email:${email} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static GetWatchHistoryByEmailANDStreamID(email, streamID)
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                const query = {}
                query.attributes = ['streamID', 'dateStartedWatching'];
                query.where = { email: email, streamID: streamID };
                query.include = [
                    {
                        model: AnimeStream,
                        required: true,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
                    }
                ];
                const animeWatchHistory = await AnimeWatchHistory.findAll(query);
                resolve(animeWatchHistory.map( (element) => { 
                        const {streamID, dateStartedWatching, AnimeStream} = element.toJSON(); 
                        const data = {streamID, dateStartedWatching, ...AnimeStream}
                        return data; 
                }));
            }
            catch(err)
            {
                Logging.LogError(`could not get animeStream from AnimeWatchHistory from database ${email}|${streamID} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static GetWatchHistoryCountByStreamID(streamID)
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                const query = {}
                query.where = { streamID: streamID };
                const animeWatchHistory = await AnimeWatchHistory.findAll(query);
                resolve(animeWatchHistory.length)
            }
            catch(err)
            {
                Logging.LogError(`could not get steamID:${streamID} AnimeWatchHistory count from database --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }
}

function AnimeWatchHistoryInit(sequelize)
{
    AnimeWatchHistory.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: Member,
                    key: 'email',  
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            streamID: {
                type: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: AnimeStream,
                    key: 'id',  
                },
                onDelete: 'CASCADE',
            },
            dateStartedWatching: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName:`${AnimeWatchHistory.name}`,
        }
    )

    // For inner join
    AnimeWatchHistory.belongsTo(AnimeStream, {
        foreignKey: 'streamID',
        targetKey: 'id',
    });
}

module.exports.AnimeWatchHistory = AnimeWatchHistory;
module.exports.AnimeWatchHistoryInit = AnimeWatchHistoryInit;

