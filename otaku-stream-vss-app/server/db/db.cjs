const chalk = require('chalk');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const isDev = (argv.dev === true || argv.d === true);

const { Sequelize } = require('sequelize');
const { Member, MemberInit } = require('../models/Accounts/member.cjs');
const { Session, SessionInit } = require('../models/Accounts/session.cjs');
const { Anime, AnimeInit } = require('../models/Anime/Anime.cjs');
const { Genre, GenreInit } = require('../models/Anime/Genre.cjs');
const { AnimeGenre, AnimeGenreInit} = require('../models/Anime/AnimeGenre.cjs');
const { AnimeOtherTranslation, AnimeOtherTranslationInit} = require('../models/Anime/AnimeOtherTranslation.cjs');
const { AnimeRate, AnimeRateInit} = require('../models/Anime/AnimeRate.cjs');
const { AnimeInstallment, AnimeInstallmentInit } = require('../models/Anime/AnimeInstallment.cjs')
const { AnimeFavorite, AnimeFavoriteInit } = require('../models/Anime/AnimeFavorite.cjs');
const { AnimeStream, AnimeStreamInit } = require('../models/Anime/AnimeStream.cjs');
const { AnimeStreamLike, AnimeStreamLikeInit } = require('../models/Anime/AnimeStreamLike.cjs');
const { AnimeWatchHistory, AnimeWatchHistoryInit } = require('../models/Anime/AnimeWatchHistory.cjs');
const dbFileName =  (isDev) ? 'Dev-OtakuStream.db' : 'OtakuStream.db';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${__dirname}/${dbFileName}`,
    logging: false,
});

MemberInit(sequelize);
SessionInit(sequelize);
GenreInit(sequelize);
AnimeInit(sequelize);
AnimeGenreInit(sequelize);
AnimeOtherTranslationInit(sequelize);
AnimeRateInit(sequelize);
AnimeInstallmentInit(sequelize);
AnimeFavoriteInit(sequelize);
AnimeStreamInit(sequelize);
AnimeStreamLikeInit(sequelize);
AnimeWatchHistoryInit(sequelize);

const Database = {
    sequelize,
    Member,
    Session,
    Anime,
    Genre,
    AnimeGenre,
    AnimeOtherTranslation,
    AnimeRate,
    AnimeInstallment,
    AnimeFavorite,
    AnimeStream,
    AnimeStreamLike,
    AnimeWatchHistory,
}

async function Setup()
{
    const isForce = (isDev);
    await sequelize.sync({force: isDev });

    if(isDev)
    {
        const { DevSetup } = require('../models/DevSetup.cjs');
        DevSetup().then();
    }
}

Setup().then();
console.log(chalk.cyan("[otakustream] database has been setup (="));

module.exports = Database;