const CombineDBJSON = require('../helper/combine-dbjson.cjs');
const { Anime } = require('../../models/Anime/Anime.cjs');
const { AnimeFavorite } = require('../../models/Anime/AnimeFavorite.cjs');
const { AnimeWatchHistory } = require('../../models/Anime/AnimeWatchHistory.cjs');
const { AnimeStreamLike } = require('../../models/Anime/AnimeStreamLike.cjs');
const { AnimeRate } = require('../../models/Anime/AnimeRate.cjs');
const { Member } = require('../../models/Accounts/member.cjs');

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
    const { latestStreamPerSeries, animeID } = req.query;

    const query = {};
    query.latestStreamPerSeries = (latestStreamPerSeries === 'true') ? true : false;
    query.animeID = (animeID) ? animeID : false

    try
    {
        const animeStreamHistoryList = await AnimeWatchHistory.GetWatchHistoryByEmail(req.session.user.email, query);
        const animeStreamHistoryListComb = await Promise.all( animeStreamHistoryList.map((animeStreamHistory) => {
                const animeStreamHistoryComb = CombineDBJSON.CombineAnimeStreamData(animeStreamHistory);
                return animeStreamHistoryComb;
            })
        )
        res.status(200).json(animeStreamHistoryListComb);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function GetSingleAnimeStreamHistory(req, res)
{
    const latestStreamPerSeries = (req.query.latestStreamPerSeries === 'true') ? req.query.latestStreamPerSeries : false;
    const { streamID } = req.params;

    try
    {
        const animeStreamHistory = await AnimeWatchHistory.GetWatchHistoryByEmailANDStreamID(req.session.user.email, streamID);
        const animeStreamHistoryComb = CombineDBJSON.CombineAnimeStreamData(animeStreamHistory);
        res.status(200).json(animeStreamHistoryComb);
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

async function GetAnimeFavorite(req, res)
{
    const { animeID } = req.params;

    try
    {
        const favorite = await AnimeFavorite.GetByEmailANDID(req.session.user.email, animeID);
        res.status(200).json(favorite);
    }
    catch(err)
    {
        res.status(200).json({error: err.message});
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

async function GetAnimeStreamLike(req, res)
{
    const { streamID } = req.params;

    try
    {
        await AnimeStreamLike.GetByEmailANDStreamID(req.session.user.email, streamID);
        res.status(200).json({success: `${req.session.user.email} successfully got AnimeStreamLike with ${streamID}`});
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

async function GetAnimeRating(req, res)
{
    const { animeID } = req.params;

    try
    {
        const animeRate = await AnimeRate.GetByEmailANDAnimeID(req.session.user.email, animeID);
        res.status(200).json(animeRate);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function AddAnimeRating(req, res)
{
    const { animeID } = req.params;
    const { newRating } = req.body;

    try
    {
        await AnimeRate.AddToDB(req.session.user.email, animeID, newRating);
        console.log(newRating);
        res.status(200).json({success: `successfully added AnimeRate with ${animeID} and rating ${newRating}`});
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function UpdateAnimeRating(req, res)
{
    const { animeID } = req.params;
    const { newRating } = req.body;

    try
    {
        await AnimeRate.UpdateDB(req.session.user.email, animeID, newRating);
        res.status(200).json({success: `successfully added AnimeRate with ${animeID} and rating ${newRating}`});
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function RemoveAnimeRating(req, res)
{
    const { animeID } = req.params;

    try
    {
        await AnimeRate.RemoveFromDB(req.session.user.email, animeID);
        res.status(200).json({success: `successfully removed AnimeRate with ${animeID}`});
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function UpdateEmail(req, res)
{
    const { newEmail, currentPassword } = req.body;
    const currentEmail = req.session.user.email;

    console.log(currentEmail, newEmail, currentPassword);

    try
    {
        await Member.UpdateEmail(currentEmail, newEmail, currentPassword);
        req.session.user.email = newEmail.toLowerCase();
        res.status(200).json({email: req.session.user.email});
    }
    catch(err)
    {
        res.status(400).json({error: err.message});
    }
}

async function UpdatePassword(req, res)
{
    const { currentPassword, newPassword } = req.body;
    const email = req.session.user.email;

    try
    {
        await Member.UpdatePassword(email, currentPassword, newPassword);
        res.status(200).json({success: "Password updated successfully"});
    }
    catch(err)
    {
        res.status(400).json({error: err.message});
    }
}

const MemberController = {
    SetupNavbar,
    GetAllAnimeFavorite,
    GetAllAnimeStreamHistory,
    GetSingleAnimeStreamHistory,
    UpdateSingleAnimeStreamHistory,
    GetAnimeFavorite,
    AddAnimeFavorite,
    RemoveAnimeFavorite,
    GetAnimeStreamLike,
    AddAnimeStreamLike,
    RemoveAnimeStreamLike,
    GetAnimeRating,
    AddAnimeRating,
    UpdateAnimeRating,
    RemoveAnimeRating,
    UpdateEmail,
    UpdatePassword,
};

module.exports = MemberController;