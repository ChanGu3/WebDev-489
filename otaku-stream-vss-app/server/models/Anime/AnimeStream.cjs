const path = require('path');
const {Model, DataTypes, Op} = require('sequelize');
const { Anime } = require('./Anime.cjs');
const { Logging, errormsg } = require('../../server-logging.cjs');
const { uploads } = require('../../server-uploads.cjs');

class AnimeStream extends Model 
{
    static async #Exists(title)
    {
        const stream = await AnimeStream.findByPk(title);
        return (stream) ? true : false;
    }

    static #AnimeStreamDirPath(animeStream)
    {
        return path.join(animeStream.animeID, animeStream.installmentID, `${animeStream.title}`);
    }

    static #CreateDirectory(animeStream)
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const dirName = this.#AnimeStreamDirPath(animeStream);
                await uploads.mkDir(dirName);
                resolve(dirName);
            }
            catch(err)
            {
                Logging.LogError(`animeStream directory creation could not be resolved for title:${animeStream.title} --- ${err}`);
                reject({error: err.message});
            }
        })
    }

    static #DeleteDirectory(animeStream)
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const dirName = this.#AnimeStreamDirPath(animeStream);
                await uploads.recursiveDirDeleteInAnime(dirName);
                resolve(dirName);
            }
            catch(err)
            {
                Logging.LogError(`animeStream directory removal could not be resolved for title:${animeStream.title} --- ${err}`);
                reject({error: err.message});
            }
        })
    }

    static AddToDB(animeID, installmentID, title, isMovie, streamNumber, synopsis, releaseDate)
    {
        return new Promise(async (resolve, reject) => { 
            try
            {
                const animeStream = await AnimeStream.build({
                    installmentID: installmentID,
                    title: title,
                    isMovie: isMovie,
                    streamNumber: streamNumber,
                    synopsis: synopsis,
                    releaseDate: releaseDate,
                    animeID: animeID,
                });

                await animeStream.validate();

                await animeStream.save();

                await this.#CreateDirectory(animeStream);
                resolve(animeStream);
            }
            catch(err)
            {
                Logging.LogError(`could not add animeStream to database ${title} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        });
    }

    static RemoveFromDB(id)
    {
        return new Promise(async (resolve, reject) => { 
            try
            {
                if(await this.#Exists(id))
                {
                    const animeStream = await AnimeStream.findOne({
                        where: {
                            id: id,
                        }
                    })
                    const dirName = this.#AnimeStreamDirPath(animeStream);
                    
                    await AnimeStream.destroy({
                        where : {
                            id: id,
                        },
                    });

                    if(await uploads.doesAnimePathExist(dirName))
                    {
                        this.#DeleteDirectory(animeStream);
                    }    
                }
                else
                {
                    Logging.LogWarning(`animeStream with id:${id} does not exists so removing is unnecessary`);
                }

                resolve();
            }
            catch(err)
            {
                Logging.LogError(`could not remove animeStream from database id:${id} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        });
    }

    static GetByID(id)
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                if(await this.#Exists(id))
                {
                    const animeStream = await AnimeStream.findOne({
                        where : {
                            id: id,
                        }
                    });
                    const {createdAt, updatedAt, ...rest} = animeStream.toJSON();
                    resolve(rest);
                }
                else
                {
                    reject(new Error(`could not get animeStream with id:${id}`));
                }
            }
            catch(err)
            {
                Logging.LogError(`could not get animeStream with id:${id} --- ${err}`);
                reject(new Error(errormsg.fallback));
            }
        });
    }

    static GetAll(query)
    {
        return new Promise(async (resolve, reject) => {
            try
            {   
                const querys = {}
                if(query.limit)
                {
                    querys.limit = query.limit;
                }
                if(query.offset)
                {
                    querys.offset = query.offset;
                }
                const animeStreamList = await AnimeStream.findAll(querys)
                resolve(animeStreamList.map((element) => { const {createdAt, updatedAt, ...rest} = element.toJSON(); return rest; }));
            }
            catch(err)
            {
                Logging.LogError(`could not get all animeStreamList --- ${err}`);
                reject({error: err.message})
            }
        })
    }

    static GetAllByInstallmentID(installmentID, isDesc = false)
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const query = {}
                query.order = []
                query.order.push(['releaseDate', (isDesc) ? 'DESC': 'ASC'])

                const animeStreamList = await AnimeStream.findAll({
                    where : {
                        installmentID: installmentID,
                    },
                })
                const animeStreamData = animeStreamList.map((element) => { 
                    const {createdAt, updatedAt, ...rest} = element.toJSON();
                    return rest;
                });
                resolve(animeStreamData);
            }
            catch(err)
            {
                Logging.LogError(`could not get animeStreamList by installmentID: ${installmentID} --- ${err}`);
                reject({error: err.message})
            }
        })
    }
}

function AnimeStreamInit(sequelize)
{
    AnimeStream.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            installmentID: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'AnimeInstallments',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            animeID: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: Anime,
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isMovie: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            streamNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            synopsis: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            releaseDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: `${AnimeStream.name}`,
            indexes: [
                {
                    unique: true,
                    fields: ['id', 'title'],
                },
                {
                    unique: true,
                    fields: ['installmentID', 'streamNumber'],
                },
            ],
        },
    )
}


module.exports.AnimeStream = AnimeStream;
module.exports.AnimeStreamInit = AnimeStreamInit;