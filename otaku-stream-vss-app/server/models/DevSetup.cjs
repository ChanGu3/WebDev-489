const { Logging } = require('../server-logging.cjs');
const { uploadsDev } = require('../server-uploads.cjs');
const { Member } = require('./Accounts/member.cjs');
const { Session } = require('./Accounts/session.cjs');
const { Anime } = require('./Anime/Anime.cjs');
const { AnimeInstallment } = require('./Anime/AnimeInstallment.cjs');
const { Genre } = require('./Anime/Genre.cjs');
const { AnimeGenre } = require('./Anime/AnimeGenre.cjs');
const { AnimeFavorite } = require('./Anime/AnimeFavorite.cjs');
const { AnimeStream } = require('./Anime/AnimeStream.cjs');
const { AnimeStreamLike } = require('./Anime/AnimeStreamLike.cjs');
const { AnimeWatchHistory } = require('./Anime/AnimeWatchHistory.cjs');
const { BillingHistory } = require('./BillingHistory.cjs');
const { Premium } = require('./Premium.cjs');
const { SavedCard } = require('./SavedCard.cjs');
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

async function DevSetup()
{
    try
    {
        // Force sync all models to create tables
        await Member.sync({ force: true });
        await Session.sync({ force: true });
        await Anime.sync({ force: true });
        await Genre.sync({ force: true });
        await AnimeGenre.sync({ force: true });
        await AnimeFavorite.sync({ force: true });
        await AnimeInstallment.sync({ force: true });
        await AnimeStream.sync({ force: true });
        await AnimeStreamLike.sync({ force: true });
        await AnimeWatchHistory.sync({ force: true });
        await BillingHistory.sync({ force: true });
        await Premium.sync({ force: true });
        await SavedCard.sync({ force: true });

        const chanMember = await Member.AddToDB('chandler@gmail.com', 'password');
        const JonMember = await Member.AddToDB('jongmin@gmail.com', 'password');
        const MonMember = await Member.AddToDB('monica@gmail.com', 'password');

        const genres = await Genre.Setup();

        await uploadsDev.clearAnimeFolder();
        const animeClouds = await Anime.AddToDB("clouds", lorem, "clouds.inc", "Japanese", 'clouds.jpg');
        await uploadsDev.CopyImageFileToAnimePath('clouds.jpg',`${animeClouds.id}/clouds.jpg`); //dev adding image
        const animeCloudsGenre1 = await AnimeGenre.AddToDB(animeClouds.id, 'Action');
        const animeCloudsSeason1 = await AnimeInstallment.AddToDB(animeClouds.id, "Season 1", true, 1);
        const animeCloudsSeason1ep1 = await AnimeStream.AddToDB(animeClouds.id, animeCloudsSeason1.id, "The New Cloud 1", false, 1, lorem, new Date(1990,0,1,0,0,0), 'cloudsep1.jpg');
        await uploadsDev.CopyImageFileToAnimePath('cloudsep1.jpg',`${animeClouds.id}/${animeCloudsSeason1.id}/${animeCloudsSeason1ep1.title}/cloudsep1.jpg`); //dev adding image
        const animeCloudsSeason1ep2 = await AnimeStream.AddToDB(animeClouds.id, animeCloudsSeason1.id, "The New Cloud 2", false, 2, lorem, new Date(1990,0,7,0,0,0), 'cloudsep2.jpg');
        await uploadsDev.CopyImageFileToAnimePath('cloudsep2.jpg',`${animeClouds.id}/${animeCloudsSeason1.id}/${animeCloudsSeason1ep2.title}/cloudsep2.jpg`); //dev adding image
        const animeCloudsSeason1ep3 = await AnimeStream.AddToDB(animeClouds.id, animeCloudsSeason1.id, "The New Cloud 3", false, 3, lorem, new Date(1990,0,14,0,0,0), 'cloudsep3.jpg');
        await uploadsDev.CopyImageFileToAnimePath('cloudsep3.jpg',`${animeClouds.id}/${animeCloudsSeason1.id}/${animeCloudsSeason1ep3.title}/cloudsep3.jpg`); //dev adding image
        const animeCloudsSeason1ep4 = await AnimeStream.AddToDB(animeClouds.id, animeCloudsSeason1.id, "The New Cloud 4", false, 4, lorem, new Date(1990,0,21,0,0,0), 'cloudsep4.jpg');
        await uploadsDev.CopyImageFileToAnimePath('cloudsep4.jpg',`${animeClouds.id}/${animeCloudsSeason1.id}/${animeCloudsSeason1ep4.title}/cloudsep4.jpg`); //dev adding image
        const animeCloudsSeason1ep5 = await AnimeStream.AddToDB(animeClouds.id, animeCloudsSeason1.id, "The New Cloud 5", false, 5, lorem, new Date(1990,0,28,0,0,0), 'cloudsep5.jpg');
        await uploadsDev.CopyImageFileToAnimePath('cloudsep5.jpg',`${animeClouds.id}/${animeCloudsSeason1.id}/${animeCloudsSeason1ep5.title}/cloudsep5.jpg`); //dev adding image
        const animeCloudsSeason1ep6 = await AnimeStream.AddToDB(animeClouds.id, animeCloudsSeason1.id, "The New Cloud 6", false, 6, lorem, new Date(1990,1,7,0,0,0), 'cloudsep6.jpg');
        await uploadsDev.CopyImageFileToAnimePath('cloudsep6.jpg',`${animeClouds.id}/${animeCloudsSeason1.id}/${animeCloudsSeason1ep6.title}/cloudsep6.jpg`); //dev adding image
        const animeCloudsSeason2 = await AnimeInstallment.AddToDB(animeClouds.id, "Season 2", true, 2);
        const animeCloudsSeason2ep1 = await AnimeStream.AddToDB(animeClouds.id, animeCloudsSeason2.id, "The Next Cloud 1", false, 1, lorem, new Date(1990,0,1,0,0,0), 'cloudss2ep1.jpg');
        await uploadsDev.CopyImageFileToAnimePath('cloudss2ep1.jpg',`${animeClouds.id}/${animeCloudsSeason2.id}/${animeCloudsSeason2ep1.title}/cloudss2ep1.jpg`); //dev adding image
        const animeCloudsMovie1 = await AnimeInstallment.AddToDB(animeClouds.id, "Movie: The Cloud Up Above", false);
        const animeCloudsMovie1part1 = await AnimeStream.AddToDB(animeClouds.id, animeCloudsMovie1.id, "The Cloud Up Above", false, 1, lorem, new Date(1990,0,1,0,0,0), 'cloudsmovie1part1.jpg');
        await uploadsDev.CopyImageFileToAnimePath('cloudsmovie1part1.jpg',`${animeClouds.id}/${animeCloudsMovie1.id}/${animeCloudsMovie1part1.title}/cloudsmovie1part1.jpg`); //dev adding image

        const anime1 = await Anime.AddToDB("StarlitHorizon", lorem, "starlit.inc", "Japanese", 'starhorizon.jpg');
        await uploadsDev.CopyImageFileToAnimePath('starhorizon.jpg',`${anime1.id}/starhorizon.jpg`); //dev adding image
        const anime1Genre1 = await AnimeGenre.AddToDB(anime1.id, 'Action');
        const anime1Season1 = await AnimeInstallment.AddToDB(anime1.id, "Season 1", true, 1);
        const anime1Season1ep1 = await AnimeStream.AddToDB(anime1.id, anime1Season1.id, "The New Horizon 1", false, 1, lorem, new Date(1990,0,1,0,0,0), 'starlithorizonep1.jpg');
        await uploadsDev.CopyImageFileToAnimePath('starlithorizonep1.jpg',`${anime1.id}/${anime1Season1.id}/${anime1Season1ep1.title}/starlithorizonep1.jpg`); //dev adding image

        const anime2 = await Anime.AddToDB("MoonlitSakura", lorem, "sakura.inc", "Japanese", "moonsakura.jpg");
        await uploadsDev.CopyImageFileToAnimePath('moonsakura.jpg',`${anime2.id}/moonsakura.jpg`); //dev adding image
        const anime2Genre1 = await AnimeGenre.AddToDB(anime2.id, 'Action');

        const anime3 = await Anime.AddToDB("CrimsonWave", lorem, "crimson.inc", "Japanese", "crimsonwave.jpg");
        await uploadsDev.CopyImageFileToAnimePath('crimsonwave.jpg',`${anime3.id}/crimsonwave.jpg`); //dev adding image

        const anime4 = await Anime.AddToDB("TwilightNinja", lorem, "ninja.inc", "Japanese", "twilightninja.jpg");
        await uploadsDev.CopyImageFileToAnimePath('twilightninja.jpg',`${anime4.id}/twilightninja.jpg`); //dev adding image

        const anime5 = await Anime.AddToDB("AzureDragon", lorem, "azure.inc", "Japanese", "azuredragon.jpg");
        await uploadsDev.CopyImageFileToAnimePath('azuredragon.jpg',`${anime5.id}/azuredragon.jpg`); //dev adding image

        const anime6 = await Anime.AddToDB("ShadowBlossom", lorem, "blossom.inc", "Japanese", "shadowblossom.jpg");
        await uploadsDev.CopyImageFileToAnimePath('shadowblossom.jpg',`${anime6.id}/shadowblossom.jpg`); //dev adding image

        const anime7 = await Anime.AddToDB("EclipseVoyage", lorem, "eclipse.inc", "Japanese", "eclipsevoyage.jpg");
        await uploadsDev.CopyImageFileToAnimePath('eclipsevoyage.jpg',`${anime7.id}/eclipsevoyage.jpg`); //dev adding image

        const anime8 = await Anime.AddToDB("RadiantKoi", lorem, "koi.inc", "Japanese", "radiantkoi.jpg");
        await uploadsDev.CopyImageFileToAnimePath('radiantkoi.jpg',`${anime8.id}/radiantkoi.jpg`); //dev adding image



        // Favorite
        const chanFavorite1 = await AnimeFavorite.AddToDB(chanMember.email, animeClouds.id);
        const chanLike1 =  await AnimeStreamLike.AddToDB(chanMember.email, animeCloudsSeason1ep1.id);
        await AnimeWatchHistory.AddToDB(chanMember.email, animeCloudsSeason1ep5.id);
        await AnimeWatchHistory.AddToDB(chanMember.email, animeCloudsSeason1ep1.id);
        await AnimeWatchHistory.AddToDB(chanMember.email, animeCloudsSeason1ep2.id);
        await new Promise(resolve => setTimeout(resolve, 100));
        await AnimeWatchHistory.AddToDB(chanMember.email, animeCloudsSeason1ep3.id);
        await AnimeWatchHistory.AddToDB(chanMember.email, animeCloudsSeason2ep1.id);

        await AnimeWatchHistory.AddToDB(chanMember.email, anime1Season1ep1.id);


        Logging.LogDev(`dev setup successfully completed`);
    }
    catch(err)
    {
        Logging.LogDev(`dbsetup: ${err.message}`);
    }
}

module.exports.DevSetup = DevSetup;