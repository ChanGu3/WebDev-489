const {Model, DataTypes, Op} = require('sequelize');
const { Logging, errormsg } = require('../../server-logging.cjs');
const { uploads } = require('../../server-uploads.cjs');
const path = require('path');

class Anime extends Model 
{

    static async #Exists(id)
    {
        const anime = await Anime.findByPk(id);
        return (anime) ? true : false;
    }

    //
    // title-id <-- folder
    //
    static #CreateDirectory(anime)
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const dirName = `${anime.title}-${anime.id}`
                await uploads.mkDir(dirName);
                resolve(dirName);
            }
            catch(err)
            {
                Logging.LogError(`anime directory creation could not be resolved for id:${id} --- ${err}`);
                reject({error: err.message});
            }
        })
    }

    static #DeleteDirectory(anime)
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const dirName = `${anime.title}-${anime.id}`
                await uploads.mkDir(dirName);
                resolve(dirName);
            }
            catch(err)
            {
                Logging.LogError(`anime directory creation could not be resolved for id:${id} --- ${err}`);
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
                    coverFilename: coverFilename
                });

                await anime.validate();

                await anime.save();

                await this.#CreateDirectory(anime);
                resolve();
            }
            catch(err)
            {
                
                Logging.LogError(`Could Not Add Anime To Database ${title} --- ${err.message}`);
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
                    const anime = await Anime.findByPk(id);

                    if(await uploads.doesDirExist())
                    {
                        resolve();
                    }   
                }
                else
                {
                    resolve();   
                }
            }
            catch(err)
            {
                Logging.LogError(`Could Not Remove Anime From Database ${title} --- ${err.message}`);
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
                    const anime = await Anime.findByPk(id)
                    resolve(anime);
                }
            }
            catch(err)
            {
                Logging.LogError(`could not get anime with id: ${id} --- ${err}`);
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
            coverFilename: {
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