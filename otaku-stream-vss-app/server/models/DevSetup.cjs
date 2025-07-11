const { Logging } = require('../server-logging.cjs');
const { uploadsDev } = require('../server-uploads.cjs');
const { Member } = require('./Accounts/member.cjs');
const { Anime } = require('./Anime/Anime.cjs');
const { AnimeInstallment } = require('./Anime/AnimeInstallment.cjs');
const { Genre } = require('./Anime/Genre.cjs');
const { AnimeGenre } = require('./Anime/AnimeGenre.cjs');
const { AnimeFavorite } = require('./Anime/AnimeFavorite.cjs');
const { AnimeStream } = require('./Anime/AnimeStream.cjs');
const { AnimeStreamLike } = require('./Anime/AnimeStreamLike.cjs');
const { AnimeWatchHistory } = require('./Anime/AnimeWatchHistory.cjs');
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

async function DevSetup()
{
    try
    {
        const chanMember = await Member.AddToDB('chandler@gmail.com', 'password');
        const JonMember = await Member.AddToDB('jongmin@gmail.com', 'password');
        const MonMember = await Member.AddToDB('monica@gmail.com', 'password');

        const genres = await Genre.Setup();

        await uploadsDev.clearAnimeFolder();
        const animeClouds = await Anime.AddToDB("clouds", lorem, "clouds.inc", "Japanese", "A-Cloud");
        const anime1 = await Anime.AddToDB("StarlitHorizon", lorem, "starlit.inc", "Japanese", "Star-Horizon");
        const anime2 = await Anime.AddToDB("MoonlitSakura", lorem, "sakura.inc", "Japanese", "Moon-Sakura");
        const anime3 = await Anime.AddToDB("CrimsonWave", lorem, "crimson.inc", "Japanese", "C-Wave");
        const anime4 = await Anime.AddToDB("TwilightNinja", lorem, "ninja.inc", "Japanese", "T-Ninja");
        const anime5 = await Anime.AddToDB("AzureDragon", lorem, "azure.inc", "Japanese", "A-Dragon");
        const anime6 = await Anime.AddToDB("ShadowBlossom", lorem, "blossom.inc", "Japanese", "S-Blossom");
        const anime7 = await Anime.AddToDB("EclipseVoyage", lorem, "eclipse.inc", "Japanese", "E-Voyage");
        const anime8 = await Anime.AddToDB("RadiantKoi", lorem, "koi.inc", "Japanese", "R-Koi");
        const animeGenre = await AnimeGenre.AddToDB(animeClouds.id, 'Action');
        const animeCloudsSeason1 = await AnimeInstallment.AddToDB(animeClouds.id, "Season 1", true, 1);
        const ep1 = await AnimeStream.AddToDB(animeClouds.id, animeCloudsSeason1.id, "The New Cloud 1", false, 1, lorem, new Date(1990,0,1,0,0,0));
        const ep2 = await AnimeStream.AddToDB(animeClouds.id, animeCloudsSeason1.id, "The New Cloud 2", false, 2, lorem, new Date(1990,0,7,0,0,0));
        const ep3 = await AnimeStream.AddToDB(animeClouds.id, animeCloudsSeason1.id, "The New Cloud 3", false, 3, lorem, new Date(1990,0,14,0,0,0));
        const ep4 = await AnimeStream.AddToDB(animeClouds.id, animeCloudsSeason1.id, "The New Cloud 4", false, 4, lorem, new Date(1990,0,21,0,0,0));
        const ep5 = await AnimeStream.AddToDB(animeClouds.id, animeCloudsSeason1.id, "The New Cloud 5", false, 5, lorem, new Date(1990,0,28,0,0,0));
        const ep6 = await AnimeStream.AddToDB(animeClouds.id, animeCloudsSeason1.id, "The New Cloud 6", false, 6, lorem, new Date(1990,1,7,0,0,0));
        const animeCloudsSeason2 = await AnimeInstallment.AddToDB(animeClouds.id, "Season 2", true, 2);
        const s2ep1 = await AnimeStream.AddToDB(animeClouds.id, animeCloudsSeason2.id, "The Next Cloud 1", false, 1, lorem, new Date(1990,0,1,0,0,0));
        const animeCloudsMovie = await AnimeInstallment.AddToDB(animeClouds.id, "Movie", false);

        // Favorite
        const chanFavorite = await AnimeFavorite.AddToDB(chanMember.email, animeClouds.id);
        const chanLike =  await AnimeStreamLike.AddToDB(chanMember.email, ep1.id);
        await AnimeWatchHistory.AddToDB(chanMember.email, ep5.id);
        await AnimeWatchHistory.AddToDB(chanMember.email, ep1.id);
        await AnimeWatchHistory.AddToDB(chanMember.email, ep2.id);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await AnimeWatchHistory.AddToDB(chanMember.email, ep3.id);
        await AnimeWatchHistory.AddToDB(chanMember.email, s2ep1.id);
        Logging.LogDev(`dev setup successfully completed`);
    }
    catch(err)
    {
        Logging.LogDev(`dbsetup: ${err.message}`);
    }
}

module.exports.DevSetup = DevSetup;