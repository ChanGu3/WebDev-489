const path = require('path');
const {Model, DataTypes} = require('sequelize');
const { Logging, errormsg } = require('../../server-logging.cjs');



class Genre extends Model 
{   
    //
    //  Genre Exists in DB true otherwise false
    //
    static async #Exists(name)
    {
       const instance = await Genre.findByPk(name);
       return (instance) ? true : false;
    }

    //
    // reject --> string: error msg
    // resolve --> instance: created Member
    //
    static #AddToDB(name)
    {
        return new Promise( async (resolve, reject) => {

            if (await this.#Exists(name))
            {
                Logging.LogWarning(`genre exists no need to add ${name} to database with the same name`);
                reject();
                return;
            }

            try
            {
                const newGenre = Genre.build({
                    name: name,
                });

                await newGenre.validate();

                await newGenre.save();

                resolve(newGenre);
            }
            catch(err)
            {
                Logging.LogError(`could not add genre to database ${name} --- ${err.message}`);
                reject();
            }
        })
    }

    static GetByGenre(name)
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                if (await this.#Exists(name))
                {
                    const existingGenre = await Genre.findByPk(name);
                    const {createdAt, updatedAt, ...rest} = existingGenre.toJSON();
                    resolve(rest);
                }
                else
                {
                    Logging.LogError(`could not get genre from database ${name} --- ${err.message}`);
                    reject(new Error(errormsg.genreDoesNotExist));
                }
            }
            catch(err)
            {
                Logging.LogError(`could not get genre from database ${name} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static GetAll()
    {
        return new Promise( async (resolve, reject) => {
            try
            {
                const allGenre = await Genre.findAll();
                resolve(allGenre.map((element) => { const {createdAt, updatedAt, ...rest} = element.toJSON(); return rest; }));
            }
            catch(err)
            {
                Logging.LogError(`could not get all genre from database --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static Setup()
    {
        return new Promise((resolve, reject) => {
            try
            {
                const genres = [
                    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
                    'Music', 'Romance', 'Slice-Of-Life', 'Sports', 'Seinen',
                    'Shonen', 'Shojo', 'Sci-Fi', 'Supernatural', 'Thriller'];

                genres.forEach(async (value, index) => {
                    await this.#AddToDB(value);
                });

                resolve(this.GetAll());
            }
            catch(err)
            {
                Logging.LogError(`could not setup genre properly --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }
}

function GenreInit(sequelize)
{
    Genre.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            sequelize,
            modelName:`${Genre.name}`,
        }
    )
}

module.exports.Genre = Genre;
module.exports.GenreInit = GenreInit;

