const {Model, DataTypes} = require('sequelize');
const { Logging, errormsg } = require('../../server-logging.cjs');
const { Anime } = require('./Anime.cjs');
const { Genre } = require('./Genre.cjs');

class AnimeGenre extends Model 
{   
    //
    // Member Exists in DB true otherwise false
    //
    static async #Exists(animeID, genre)
    {
       const instance = await AnimeGenre.findOne({
            where: {
                animeID: animeID,
                genre: genre,
            }
       });
       return (instance) ? true : false;
    }

    //
    // reject --> string: error msg
    // resolve --> instance: created Member
    //
    static AddToDB(animeID, genre)
    {
        return new Promise( async (resolve, reject) => {

            if (await this.#Exists(animeID, genre))
            {
                Logging.LogWarning(`animeID & genre pair exists`);
                reject(new Error(`anime already has this genre`));
                return;
            }

            try
            {
                const newAnimeGenre = await AnimeGenre.build({
                    animeID: animeID,
                    genre: genre,
                });

                await newAnimeGenre.validate();

                await newAnimeGenre.save();

                resolve(newAnimeGenre);
            }
            catch(err)
            {
                Logging.LogError(`could not add AnimeGenre to database ${animeID}|${genre} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static GetAllByAnimeID(animeID)
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                const animeGenres = await AnimeGenre.findAll({
                        where: {
                            animeID: animeID,
                        }
                    });
                resolve(animeGenres.map((element) => { return element.toJSON() }));
            }
            catch(err)
            {
                Logging.LogError(`could not get list of AnimeGenres from database using animeID:${animeID} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static GetAllByGenre(genre)
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                const animeGenres = await AnimeGenre.findAll({
                        where: {
                            genre: genre,
                        }
                    });
                resolve(animeGenres.map((element) => { return element.toJSON() }));
            }
            catch(err)
            {
                Logging.LogError(`could not get list of AnimeGenres from database using genre:${genre} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static GetByAnimeGenre(animeID, genre)
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                if (await this.#Exists(animeID, genre))
                {
                    const animeGenre = await AnimeGenre.findOne({
                        where: {
                            animeID: animeID,
                            genre: genre,
                        }
                    });
                    resolve(animeGenre.toJSON());
                }
                else
                {
                    Logging.LogWarning(`AnimeGenre does not exist ${animeID}|${genre} --- ${err.message}`);
                    reject(new Error(errormsg.animeGenreDoesNotExist));
                }
            }
            catch(err)
            {
                Logging.LogError(`could not get AnimeGenre from database ${animeID}|${genre} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }
}

function AnimeGenreInit(sequelize)
{
    AnimeGenre.init(
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
            genre: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: Genre,
                    key: 'name',  
                },
                onDelete: 'CASCADE',
            },
        },
        {
            sequelize,
            modelName:`${AnimeGenre.name}`,
        }
    )
}

module.exports.AnimeGenre = AnimeGenre;
module.exports.AnimeGenreInit = AnimeGenreInit;

