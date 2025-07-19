const path = require('path');
const {Model, DataTypes, Op} = require('sequelize');
const { Anime } = require('./Anime.cjs');
const { AnimeStream } = require('./AnimeStream.cjs');
const { Logging, errormsg } = require('../../server-logging.cjs');
const { uploads } = require('../../server-uploads.cjs');

async function AddEpisodeCount(installment)
{
    const animeStream = await AnimeStream.GetAllByInstallmentID(installment.id);
    installment.episodes = animeStream.length;

    return installment;
}

class AnimeInstallment extends Model 
{
    static async #Exists(id)
    {
        const anime = await AnimeInstallment.findByPk(id);
        return (anime) ? true : false;
    }

    static #AnimeDirPath(animeInstallment)
    {
        return path.join(animeInstallment.animeID, animeInstallment.id);
    }

    static #CreateDirectory(animeInstallment)
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const dirName = this.#AnimeDirPath(animeInstallment);
                await uploads.mkDir(dirName);
                resolve(dirName);
            }
            catch(err)
            {
                Logging.LogError(`animeInstallment directory creation could not be resolved for id:${animeInstallment.id} --- ${err}`);
                reject({error: err.message});
            }
        })
    }

    static #DeleteDirectory(animeInstallment)
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const dirName = this.#AnimeDirPath(animeInstallment);
                await uploads.recursiveDirDeleteInAnime(dirName);
                resolve(dirName);
            }
            catch(err)
            {
                Logging.LogError(`AnimeInstallment directory removal could not be resolved for id:${animeInstallment.id} --- ${err}`);
                reject({error: err.message});
            }
        })
    }

    static AddToDB(animeID, title, isSeason, seasonNum)
    {
        return new Promise(async (resolve, reject) => { 
            try
            {
                const animeInstallment = await AnimeInstallment.build({
                    animeID: animeID,
                    title: title,
                    isSeason: isSeason,
                    seasonNum: seasonNum,
                });

                await animeInstallment.validate();

                await animeInstallment.save();

                await this.#CreateDirectory(animeInstallment);
                resolve(animeInstallment);
            }
            catch(err)
            {
                Logging.LogError(`could not add animeInstallment to database ${title} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        });
    }

    static UpdateInDB(id, update, transaction = null)
    {
        return new Promise(async (resolve, reject) => { 
            try
            {
                const updateValues = {}
                if(update.title) { updateValues.title = update.title; }

                const query = {}
                query.where = {}
                query.where.id = id;
                if(transaction)
                {
                    query.transaction = transaction;
                }

                await AnimeInstallment.update(updateValues, query);

                resolve();
            }
            catch(err)
            {
                Logging.LogError(`could not update animeInstallment in database ${id} --- ${err.message}`);
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
                    const animeInstallment = await AnimeInstallment.findByPk(id);
                    const dirName = this.#AnimeDirPath(animeInstallment);
                    
                    await AnimeInstallment.destroy({
                        where: {
                            id: animeInstallment.id
                        },
                    });

                    if(await uploads.doesAnimePathExist(dirName))
                    {
                        this.#DeleteDirectory(animeInstallment);
                    }    
                }
                else
                {
                    Logging.LogWarning(`animeInstallment with id:${id} does not exists so removing is unnecessary`);
                }

                resolve();
            }
            catch(err)
            {
                Logging.LogError(`could not remove animeInstallment from database ${id} --- ${err.message}`);
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
                    const animeInstallment = await AnimeInstallment.findByPk(id)
                    await AddEpisodeCount(animeInstallment.toJSON());
                    resolve(animeInstallment);
                }
                else
                {
                    reject(new Error(`could not get animeInstallment with id: ${id}`));
                }
            }
            catch(err)
            {
                Logging.LogError(`could not get animeInstallment with id: ${id} --- ${err}`);
                reject(new Error(errormsg.fallback));
            }
        });
    }

    
    static GetAll({animeID = false} = {})
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const query = {}
                query.order = [];
                query.order.push (['createdAt', 'ASC']);
                if(animeID)
                {
                    query.where = { animeID: animeID }
                }

                const animeInstallmentList = await AnimeInstallment.findAll(query);
                const newAnimeInstallmentList = await Promise.all(
                    animeInstallmentList.map(async (element) => { return await AddEpisodeCount(element.toJSON()); })
                );
                resolve(newAnimeInstallmentList);
            }
            catch(err)
            {
                Logging.LogError(`could not get all animeInstallments --- ${err}`);
                reject({error: err.message})
            }
        })
    }

    static GetAllByAnimeID(animeID)
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const query = {}
                query.where = { animeID: animeID }
                query.order = [];
                query.order.push(['createdAt', 'ASC']);
                const animeInstallmentList = await AnimeInstallment.findAll(query)
                let seasons = 0;
                let movies =  0;
                const animeInstallmentData = {};
                animeInstallmentData.list = await Promise.all( animeInstallmentList.map( async (element) => { 
                        const {animeID, createdAt, updatedAt, ...rest} = element.toJSON();
                        if(element.isSeason)
                        {
                            seasons = seasons + 1;
                        }
                        else
                        {
                            movies = movies + 1;
                        }
                        await AddEpisodeCount(rest);
                        return rest;
                    })
                );
                animeInstallmentData.seasons = seasons;
                animeInstallmentData.movies = movies;
                resolve(animeInstallmentData);
            }
            catch(err)
            {
                Logging.LogError(`could not get animeInstallmentList by animeID: ${animeID} --- ${err}`);
                reject({error: err.message})
            }
        })
    }
}

function AnimeInstallmentInit(sequelize)
{
    AnimeInstallment.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
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
            isSeason: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            seasonNum: {
                type: DataTypes.INTEGER,
                allowNull: true,
            }
        },
        {
            sequelize,
            modelName: `${AnimeInstallment.name}`,
            indexes: [
                {
                    unique: true,
                    fields: ['animeID', 'seasonNum'],
                },
            ],
        },
        
    )
}


module.exports.AnimeInstallment = AnimeInstallment;
module.exports.AnimeInstallmentInit = AnimeInstallmentInit;