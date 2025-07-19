const {Model, DataTypes, Sequelize, Op} = require('sequelize');
const { Logging, errormsg } = require('../../server-logging.cjs');
const { uploads } = require('../../server-uploads.cjs');
const multer = require('multer');


class Anime extends Model 
{
    static async Exists(id)
    {
        const anime = await Anime.findByPk(id);
        return (anime) ? true : false;
    }

    static #AnimeDirPath(anime)
    {
        return `${anime.id}`;
    }

    static #CreateDirectory(anime)
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const dirName = this.#AnimeDirPath(anime);
                await uploads.mkDir(dirName);
                resolve(dirName);
            }
            catch(err)
            {
                Logging.LogError(`anime directory creation could not be resolved for id:${anime.id} --- ${err}`);
                reject({error: err.message});
            }
        })
    }

    static #DeleteDirectory(anime)
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const dirName = this.#AnimeDirPath(anime);
                await uploads.recursiveDirDeleteInAnime(dirName);
                resolve(dirName);
            }
            catch(err)
            {
                Logging.LogError(`anime directory removal could not be resolved for id:${anime.id} --- ${err}`);
                reject({error: err.message});
            }
        })
    }

    static AddToDB(title, description, copyright, originalTranslation, coverFilename)
    {
        return new Promise(async (resolve, reject) => { 
            try
            {
                const anime = await Anime.build({
                    title: title,
                    description: description, 
                    copyright: copyright, 
                    originalTranslation: originalTranslation, 
                    coverHREF: `temp`,
                });

                await anime.validate();

                await anime.save();

                Anime.update(
                    {
                        coverHREF: `/uploads/anime/${anime.id}/${coverFilename}`,
                    },
                    {
                        where: {
                            id: anime.id,
                        },
                    }
                );

                await this.#CreateDirectory(anime);
                resolve(anime);
            }
            catch(err)
            {
                Logging.LogError(`Could Not Add Anime To Database ${title} --- ${err.message}`);
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
                if(update.description) { updateValues.description = update.description; }
                if(update.copyright) { updateValues.copyright = update.copyright; }
                if(update.originalTranslation) { updateValues.originalTranslation = update.originalTranslation; }
                if(update.coverFilename) { updateValues.coverHREF = `/uploads/anime/${id}/${update.coverFilename}`; }

                const query = {}
                query.where = {}
                query.where.id = id;
                if(transaction)
                {
                    query.transaction = transaction;
                }

                await Anime.update(
                    updateValues,
                    query,
                );

                resolve();
            }
            catch(err)
            {
                Logging.LogError(`Could Not Update Anime In Database ${id} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        });
    }

    static RemoveFromDB(id)
    {
        return new Promise(async (resolve, reject) => { 
            try
            {
                if(await this.Exists(id))
                {
                    const anime = await Anime.findByPk(id);
                    const dirName = this.#AnimeDirPath(anime);
                    
                    await Anime.destroy({
                        where: {
                            id : anime.id
                        },
                    });

                    if(await uploads.doesAnimePathExist(dirName))
                    {
                        this.#DeleteDirectory(anime);
                    }    
                }
                else
                {
                    Logging.LogWarning(`anime with id:${id} does not exists so removing is unnecessary`);
                }

                resolve();
            }
            catch(err)
            {
                Logging.LogError(`could not remove anime from database ${id} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        });
    }

    static GetByID(id)
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                if(await this.Exists(id))
                {
                    const anime = await Anime.findByPk(id)
                    resolve(anime.toJSON());
                }
                else
                {
                    Logging.LogError(`could not get anime with id: ${id}`);
                    reject({error: `could not get anime with id: ${id}`});
                }
            }
            catch(err)
            {
                Logging.LogError(`could not get anime with id: ${id} --- ${err}`);
                reject({error: err.message})
            }
        })
    }

    static GetAll({getNewestReleases = false, limit = 10, isAZ = false, search = undefined, shuffle = false } = {})
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const query = {}
                query.order = []
                query.where = {}
                if (getNewestReleases)
                {
                    query.limit = 6;
                    query.offset = 0;
                    query.order.push(['createdAt', 'ASC'])
                }
                query.limit = limit;
                if(isAZ)
                {
                    query.order.push([Sequelize.fn('LOWER', Sequelize.col('title')), 'ASC']);
                }

                if(search)
                {   
                    query.where.title = {
                        [Op.like]: `%${search}%`
                    }
                }

                if(shuffle)
                {
                    query.order.push([Sequelize.literal('Random()')]);
                }

                const animeList = await Anime.findAll(query);
                
                resolve(animeList.map((element) => {
                    return element.toJSON();
                }));

                
            }
            catch(err)
            {
                Logging.LogError(`could not get all anime --- ${err}`);
                reject({error: err.message})
            }
        })
    }
}

function AnimeInit(sequelize)
{
    Anime.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            copyright: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            originalTranslation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            coverHREF: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: `${Anime.name}`,
        },
    )
}


module.exports.Anime = Anime;
module.exports.AnimeInit = AnimeInit;