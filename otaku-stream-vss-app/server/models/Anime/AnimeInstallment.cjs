const path = require('path');
const {Model, DataTypes, Op} = require('sequelize');
const { Anime } = require('./Anime.cjs');
const { Logging, errormsg } = require('../../server-logging.cjs');
const { uploads } = require('../../server-uploads.cjs');

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
                    resolve(animeInstallment.toJSON());
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

    
    static GetAll()
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const animeInstallmentList = await AnimeInstallment.findAll()

                resolve(animeInstallmentList.map((element) => { return element.toJSON(); }));
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
                const animeInstallmentList = await AnimeInstallment.findAll({
                    where : {
                        animeID: animeID,
                    }
                })
                let seasons = 0;
                let movies =  0;
                const animeInstallmentData = {};
                animeInstallmentData.list = animeInstallmentList.map((element) => { 
                    const {animeID, createdAt, updatedAt, ...rest} = element.toJSON();
                    if(element.isSeason)
                    {
                        seasons = seasons + 1;
                    }
                    else
                    {
                        movies = movies + 1;
                    }
                    return rest;
                });
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
                unique: true,
                allowNull: true,
            }
        },
        {
            sequelize,
            modelName: `${AnimeInstallment.name}`,
        },
    )
}


module.exports.AnimeInstallment = AnimeInstallment;
module.exports.AnimeInstallmentInit = AnimeInstallmentInit;