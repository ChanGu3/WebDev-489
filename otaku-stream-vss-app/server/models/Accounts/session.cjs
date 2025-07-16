const chalk = require('chalk');

const {Model, DataTypes, Op} = require('sequelize');
const { Member } = require('./member.cjs');
const cron = require('node-cron');
const { Logging, errormsg } = require('../../server-logging.cjs');

function GetNewExpDate()
{
    newDate = new Date();
    newDate.setDate(newDate.getDate() + 31);
    newDate.setHours(0,0,0,0);
    return newDate;
}

class Session extends Model 
{   
    static async #Exists(id)
    {
       const instance = await Session.findByPk(id);
       return (instance) ? true : (() => { return false; })();
    }

    //
    // reject --> string: error msg
    // resolve --> instance: session
    //
    static AddToDB(id, email)
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                // if id exists dont add just return and warn
                if(await this.#Exists(id))
                {   
                    console.warn(chalk.yellow(`[otakustream] did not add ${id} to DB the id already exists in session table`));
                    resolve(Session.findByPk(id));
                    return
                }

                const newSession = Session.build({
                    id: id,
                    email: email,
                    expDate: GetNewExpDate(),
                });

                newSession.validate();

                newSession.save();

                resolve(newSession);
            }
            catch(err)
            {
                console.error(chalk.red(`[otakustream] Could Not Build Session For ${email} --- ${err}`));
                reject(new Error(errormsg.fallback));
            }
        });
    }

    //
    // reject --> string: error msg
    // resolve --> string: session email
    //
    static GetEmail(id)
    {
        return new Promise( async (resolve, reject) => {
            const session = await Session.findByPk(id);

            if (session)
            {
                resolve(session.email);
            }
            else
            {
                reject(new Error(errormsg.sessionDoesNotExist));
            }
        });
    }

    //
    // reject --> string: error msg
    // resolve --> instance: session
    //
    static LogExistingSession(id)
    {
        return new Promise(async (resolve, reject) => {
            if (this.#Exists(id))
            {
                try
                {
                    const session = await Session.findByPk(id);
                    session.expDate = GetNewExpDate();
                    await session.validate();
                    await session.save();

                    resolve(session);
                }
                catch(err)
                {
                    console.error(chalk.red(`[otakustream] Could Not Log Session For ${id} --- ${err}`));
                    reject(new Error(errormsg.fallback));
                }
            }
            else
            {
                reject(new Error(errormsg.sessionDoesNotExist));
            }
        });
    }

    //
    // reject --> string: error msg
    // resolve --> instance: session
    //
    static UpdateSessionID(oldID, newID) 
    {
        return new Promise( async (resolve, reject) => {
            if(await this.#Exists(oldID))
            {
                try
                {
                    await Session.update(
                        { id: newID },             
                        { where: { id: oldID } } 
                    );

                    resolve(await Session.findByPk(newID));
                }
                catch(err)
                {
                    console.error(chalk.red(`[otakustream] Could Not Update Session For ${oldID} --- ${err}`));
                    reject(new Error(errormsg.fallback));
                }
            }
            else
            {
                console.error(chalk.red(`[otakustream] Could Not Update Session For ${oldID}`));
                reject(new Error(errormsg.sessionDoesNotExist));
            }
        });
    }

    //
    // reject --> string: error msg
    // resolve --> nothing
    //
    static RemoveSessionByID(id)
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                await Session.destroy({ where: { id: id } } );
                resolve();
            }
            catch(err)
            {
                reject(new Error(errormsg.sessionDoesNotExist));
            }
        })
    }
}

function SessionInit(sequelize)
{
    Session.init(
        {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                },
                references: {
                    model: Member,
                    key: 'email',  
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            expDate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: () => { return GetNewExpDate() },
            },
        },
        {
            sequelize,
            modelName: `${Session.name}`,
        }
    )

    cron.schedule('0 0 * * *', async () => {
        const dateNow = new Date();

        await Session.destroy({
            where: {
                expDate : {
                    [Op.ls]: dateNow,
                },
            },
        });
        Logging.LogProcess(`Purged All Expired Session on ${dateNow}`);
    });
}

module.exports.Session = Session;
module.exports.SessionInit = SessionInit;

