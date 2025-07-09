const { Logging } = require('../server-logging.cjs');
const { Member } = require('./Accounts/member.cjs');
const { Anime } = require('./Anime/Anime.cjs');

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

async function DevSetup()
{
    try
    {
        const chanMember = await Member.AddToDB('chandler@gmail.com', 'password');
        const JonMember = await Member.AddToDB('jongmin@gmail.com', 'password');
        const MonMember = await Member.AddToDB('monica@gmail.com', 'password');
        
        const anime = await Anime.AddToDB("clouds", lorem, "clouds.inc", "Japanese", "A-Cloud");
    }
    catch(err)
    {
        Logging.LogDev(`dbsetup: ${err.message}`);
    }
}

module.exports.DevSetup = DevSetup;