const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const { errormsg } = require('../../server-logging.cjs');
const saltRounds = 12;

function HashPassword(password, saltRounds){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err) 
        {
            console.error(`Could Not Hash ${email} --- ${err.message}`);
            reject(new Error(errormsg.fallback));
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
                reject(new Error(errormsg.emailExists));
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
                reject(new Error(errormsg.fallback));
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
                            
                            reject(new Error(errormsg.authorizationFail));
                        }
                    }
                    catch(err)
                    {
                        console.error(`Could Not Hash ${email} --- ${err.message}`);
                        reject(new Error(errormsg.fallback));
                    }
                }
                else
                {
                    reject(new Error(errormsg.authorizationFail));
                }
            }
            else
            {
                reject(new Error(errormsg.authorizationFail));
            }
        })
    }

    //
    // reject --> string: error msg
    // resolve --> instance: updated Member
    //
    static UpdateEmail(oldEmail, newEmail, password)
    {
        return new Promise(async (resolve, reject) => {
            const oldEmailLower = oldEmail.toLowerCase();
            const newEmailLower = newEmail.toLowerCase();
            
            try
            {
                // Check if old email exists and password is correct
                if (!(await Member.Exists(oldEmailLower)))
                {
                    reject(new Error("User not found"));
                    return;
                }

                const existingUser = await Member.findByPk(oldEmailLower);
                if (!(await bcrypt.compare(password, existingUser.password)))
                {
                    reject(new Error("Current password is incorrect"));
                    return;
                }

                // Check if new email already exists
                if (await Member.Exists(newEmailLower))
                {
                    reject(new Error("New email already exists"));
                    return;
                }

                // Update email
                existingUser.email = newEmailLower;
                await existingUser.save();

                resolve(existingUser);
            }
            catch(err)
            {
                console.error(`Could Not Update Email ${oldEmail} to ${newEmail} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
            }
        })
    }

    //
    // reject --> string: error msg
    // resolve --> instance: updated Member
    //
    static UpdatePassword(email, currentPassword, newPassword)
    {
        return new Promise(async (resolve, reject) => {
            const emailLower = email.toLowerCase();
            
            try
            {
                // Check if user exists
                if (!(await Member.Exists(emailLower)))
                {
                    reject(new Error("User not found"));
                    return;
                }

                const existingUser = await Member.findByPk(emailLower);
                
                // Verify current password
                if (!(await bcrypt.compare(currentPassword, existingUser.password)))
                {
                    reject(new Error("Current password is incorrect"));
                    return;
                }

                // Hash new password
                const newHash = await HashPassword(newPassword, saltRounds);
                
                // Update password
                existingUser.password = newHash;
                await existingUser.save();

                resolve(existingUser);
            }
            catch(err)
            {
                console.error(`Could Not Update Password for ${email} --- ${err.message}`);
                reject(new Error(errormsg.fallback));
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
            modelName:`${Member.name}`,
        }
    )
}

module.exports.Member = Member;
module.exports.MemberInit = MemberInit;

