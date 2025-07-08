const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const ErrorMsg = require('./error-msg.cjs');
const saltRounds = 12;

function HashPassword(password, saltRounds){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err) 
        {
            console.error(`Could Not Hash ${email} --- ${err.message}`);
            reject(new Error(ErrorMsg.fallback));
        }
        else
        {
            resolve(hash);
        }
        });
    });
}

class Member extends Model 
{   
    //
    // Member Exists in DB true otherwise false
    //
    static async Exists(email)
    {
       const emailLower = email.toLowerCase();
       const instance = await Member.findByPk(emailLower);
       return (instance) ? true : false;
    }

    //
    // reject --> null
    // resolve --> instance: Member
    //
    static GetByEmail(email)
    {
        return new Promise(async (resolve, reject) => {
            const emailLower = email.toLowerCase();
            if (await Member.Exists(emailLower))
            {
                resolve(await Member.findByPk(emailLower));
            }
            else
            {
                reject(null);
            }
        })
    }

    //
    // reject --> string: error msg
    // resolve --> instance: created Member
    //
    static AddToDB(email, password)
    {
        return new Promise( async (resolve, reject) => {
            const emailLower = email.toLowerCase();

            if (await Member.Exists(emailLower))
            {
                reject(new Error(ErrorMsg.emailExists));
                return;
            }

            try
            {
                const hash = await HashPassword(password, saltRounds);

                const newMember = Member.build({
                    email: emailLower,
                    password: hash
                });

                await newMember.validate();

                await newMember.save();

                resolve(newMember);
            }
            catch(err)
            {
                console.error(`Could Not Add Member To Database ${email} --- ${err.message}`);
                reject(new Error(ErrorMsg.fallback));
            }
        })
    }

    //
    // reject --> string: error msg
    // resolve --> instance: authorized Member
    //
    static Authorization(email, password)
    {
        return new Promise(async (resolve, reject) => {
            const emailLower = email.toLowerCase();
            
            if(await Member.Exists(emailLower))
            {   
                const existingUser = await Member.findByPk(emailLower);
                if (existingUser)
                {
                    try
                    {
                        if (await bcrypt.compare(password, existingUser.password))
                        {
                            resolve(existingUser);
                        }
                        else
                        {
                            
                            reject(new Error(ErrorMsg.authorizationFail));
                        }
                    }
                    catch(err)
                    {
                        console.error(`Could Not Hash ${email} --- ${err.message}`);
                        reject(new Error(ErrorMsg.fallback));
                    }
                }
                else
                {
                    reject(new Error(ErrorMsg.authorizationFail));
                }
            }
            else
            {
                reject(new Error(ErrorMsg.authorizationFail));
            }
        })
    }
}

function MemberInit(sequelize)
{
    Member.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
                validate: {
                    isEmail: true
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [7, Infinity],
                },
            }
        },
        {
            sequelize,
            modelName:"Member",
        }
    )
}

module.exports.Member = Member;
module.exports.MemberInit = MemberInit;

