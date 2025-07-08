const chalk = require('chalk');
const { Member, MemberInit } = require('./member.cjs');
const { Session, SessionInit } = require('./session.cjs');

async function DevSetup()
{
    try
    {
        const chanMember = await Member.AddToDB('chandler@gmail.com', 'password');
        const JonMember = await Member.AddToDB('jongmin@gmail.com', 'password');
        const MonMember = await Member.AddToDB('monica@gmail.com', 'password');
    }
    catch(err)
    {
        console.warn(chalk.yellowBright(`[dev-dbsetup-otakustream] ${err.message}`));
    }
}

module.exports.DevSetup = DevSetup;