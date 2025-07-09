const chalk = require('chalk');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const isDev = (argv.dev === true || argv.d === true);

const { Sequelize } = require('sequelize');
const { Member, MemberInit } = require('../models/Accounts/member.cjs');
const { Session, SessionInit } = require('../models/Accounts/session.cjs');
const { Anime, AnimeInit } = require('../models/Anime/Anime.cjs');

const dbFileName =  (isDev) ? 'Dev-OtakuStream.db' : 'OtakuStream.db';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${__dirname}/${dbFileName}`,
    logging: false,
});

MemberInit(sequelize);
SessionInit(sequelize);
AnimeInit(sequelize);

const Database = {
    sequelize,
    Member,
    Session,
}

async function Setup()
{
    const isForce = (isDev);
    await sequelize.sync({force: true });

    if(isDev)
    {
        const { DevSetup } = require('../models/DevSetup.cjs');
        DevSetup().then();
    }
}

Setup().then();
console.log(chalk.cyan("[otakustream] database has been setup (="));

module.exports = Database;