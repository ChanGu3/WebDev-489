const {Model, DataTypes} = require('sequelize');
const { Logging, errormsg } = require('../../server-logging.cjs');
const { Member } = require('../Accounts/member.cjs');

const adminDefault = {email: 'root@fake.com', password: 'password'}

class Admin extends Model 
{   
    //
    // Admin Exists in DB true otherwise false
    //
    static async Exists(email)
    {
       const emailLower = email.toLowerCase();
       const instance = await Admin.findByPk(emailLower);
       return (instance) ? true : false;
    }

    //
    // reject --> string: error msg
    // resolve --> instance: created Admin
    //
    static #AddToDB(email)
    {
        return new Promise( async (resolve, reject) => {
            const emailLower = email.toLowerCase();

            if (await this.Exists(emailLower))
            {
                Logging.LogError(`${email} is already an admin`);
                resolve();
                return;
            }

            try
            {
                const newAdmin = Admin.build({
                    email: emailLower,
                });

                await newAdmin.validate();

                await newAdmin.save();

                resolve(newAdmin);
            }
            catch(err)
            {
                Logging.LogError(`Could Not Add Admin To Database ${email} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    static async SetupRootAdmin()
    {
        try
        {
            const adminList = await Admin.findAll()

            if(adminList.length <= 0)
            {
                const admin = await Member.AddToDB(adminDefault.email, adminDefault.password);
                await this.#AddToDB(admin.email);
                Logging.LogProcess(`admin account created using default`);
            }
            else
            {
                Logging.LogProcess(`attempted to create default admin account but it already exists [only one admin is allowed]`);
            }
        }
        catch(err)
        {
            Logging.LogError(`${err}`);
            throw new Error(err.message);
        }

        Logging.LogProcess(`|default admin credentials| email: ${adminDefault.email} - password: ${adminDefault.password}`);
    }
}

function AdminInit(sequelize)
{
    Admin.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
                validate: {
                    isEmail: true
                },
                references:{
                    model: Member,
                    key: 'email'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
        },
        {
            sequelize,
            modelName:`${Admin.name}`,
        }
    )
}

module.exports.Admin = Admin;
module.exports.AdminInit = AdminInit;

