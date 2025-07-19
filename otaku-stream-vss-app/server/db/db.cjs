const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const isDev = (argv.dev === true || argv.d === true);
const { Logging } = require('../server-logging.cjs');

const { Sequelize } = require('sequelize');
const { Member, MemberInit } = require('../models/Accounts/member.cjs');
const { Admin, AdminInit } = require('../models/Accounts/admin.cjs');
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
const { BillingHistory, BillingHistoryInit } = require('../models/BillingHistory.cjs');
const { Premium, PremiumInit } = require('../models/Premium.cjs');
const { SavedCard, SavedCardInit } = require('../models/SavedCard.cjs');

const dbFileName =  (isDev) ? 'Dev-OtakuStream.db' : 'OtakuStream.db';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${__dirname}/${dbFileName}`,
    logging: false,
});

MemberInit(sequelize);
AdminInit(sequelize);
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
BillingHistoryInit(sequelize);
PremiumInit(sequelize);
SavedCardInit(sequelize);

const Database = {
    sequelize,
    Member,
    Admin,
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
    BillingHistory,
    Premium,
    SavedCard,
}


async function Setup()
{
    try
    {
        await sequelize.sync({force: isDev });

        if(isDev)
        {
            const { DevSetup } = require('../models/DevSetup.cjs');
            await DevSetup();
        }
        await Genre.Setup();
        await Admin.SetupRootAdmin();
    }
    catch(err)
    {
        //throw new Error(err.message);
    }
}

Setup().then().catch((err) => { Logging.LogError(`(something went wrong setting up development) ${err}`) });
Logging.LogProcess("database has been setup (=");

module.exports = Database;