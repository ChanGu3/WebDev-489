const CombineDBJSON = require('../helper/combine-dbjson.cjs');
const { Anime } = require('../../models/Anime/Anime.cjs');
const { AnimeFavorite } = require('../../models/Anime/AnimeFavorite.cjs');
const { AnimeWatchHistory } = require('../../models/Anime/AnimeWatchHistory.cjs');
const { AnimeStreamLike } = require('../../models/Anime/AnimeStreamLike.cjs');

async function AllowedRoutes(req, res, next) 
{
    res.status(200).json();
}

async function SetupNavbar(req, res, next) 
{
    res.status(200).json({user: { email: req.session.user.email } });
}

async function GetAllAnimeFavorite(req, res)
{
    try
    {
        const animeFavoriteList = await AnimeFavorite.GetAllByEmail(req.session.user.email);
        const animeFavoriteData = {};
        animeFavoriteData.list = await Promise.all(
            animeFavoriteList.map(async (element) => {
                const anime = await Anime.GetByID(element.animeID); // should go back and inner join but oh well time crunch
                return await CombineDBJSON.CombineAnimeData(anime);
            })
        );
        res.status(200).json(animeFavoriteData);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function GetAllAnimeStreamHistory(req, res)
{
    const latestStreamPerSeries = (req.query.latestStreamPerSeries === 'true') ? req.query.latestStreamPerSeries : false;

    try
    {
        const animeStreamHistoryList = await AnimeWatchHistory.GetWatchHistoryByEmail(req.session.user.email, {latestStreamPerSeries: latestStreamPerSeries});
        res.status(200).json(animeStreamHistoryList);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function GetSingleAnimeStreamHistory(req, res)
{
    const { streamID } = req.params;

    try
    {
        const animeStreamHistoryList = await AnimeWatchHistory.GetWatchHistoryByEmailANDStreamID(req.session.user.email, streamID);
        res.status(200).json(animeStreamHistoryList);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function UpdateSingleAnimeStreamHistory(req, res)
{
    const { streamID } = req.params;

    try
    {
        if(await AnimeWatchHistory.Exists(req.session.user.email, streamID))
        {
            await AnimeWatchHistory.UpdateDB(req.session.user.email, streamID);
            res.status(200).json({success: "updated the streamID to history"});
        }
        else
        {
            await AnimeWatchHistory.AddToDB(req.session.user.email, streamID);
            res.status(200).json({success: "added the streamID to history"});
        }
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function AddAnimeFavorite(req, res)
{
    const { animeID } = req.params;

    try
    {
        await AnimeFavorite.AddToDB(req.session.user.email, animeID);
        res.status(200).json({success: `successfully added Anime as a Favorite with ${animeID}`});
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function RemoveAnimeFavorite(req, res)
{
    const { animeID } = req.params;

    try
    {
        await AnimeFavorite.RemoveFromDB(req.session.user.email, animeID);
        res.status(200).json({success: `successfully removed Anime as a Favorite with ${animeID}`});
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function AddAnimeStreamLike(req, res)
{
    const { streamID } = req.params;

    try
    {
        await AnimeStreamLike.AddToDB(req.session.user.email, streamID);
        res.status(200).json({success: `successfully added AnimeStream with ${streamID}`});
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function RemoveAnimeStreamLike(req, res)
{
    const { streamID } = req.params;

    try
    {
        await AnimeStreamLike.RemoveFromDB(req.session.user.email, streamID);
        res.status(200).json({success: `successfully removed AnimeStream with ${streamID}`});
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

const MemberController = {
    AllowedRoutes,
    SetupNavbar,
    GetAllAnimeFavorite,
    GetAllAnimeStreamHistory,
    GetSingleAnimeStreamHistory,
    UpdateSingleAnimeStreamHistory,
    AddAnimeFavorite,
    RemoveAnimeFavorite,
    AddAnimeStreamLike,
    RemoveAnimeStreamLike
};

module.exports = MemberController;