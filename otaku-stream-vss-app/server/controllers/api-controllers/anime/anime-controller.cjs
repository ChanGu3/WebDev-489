const CombineDBJSON = require('../../helper/combine-dbjson.cjs');
const { Anime } = require('../../../models/Anime/Anime.cjs');
const { AnimeInstallment } = require('../../../models/Anime/AnimeInstallment.cjs');
const { AnimeStream } = require('../../../models/Anime/AnimeStream.cjs');
const { AnimeStreamLike } = require('../../../models/Anime/AnimeStreamLike.cjs')
const { Genre } = require('../../../models/Anime/Genre.cjs');

async function GetAllAnime(req, res)
{
    const query = {}

    const { limit, getNewestReleases, isAZ, genres, search, shuffle } = req.query;
    if (getNewestReleases === 'true') { query.getNewestReleases = true; }
    if (limit && Number(limit) !== NaN) { query.limit = Number(limit) }
    if (isAZ === 'true') { query.isAZ = true }
    let genresList = null;
    if (genres !== 'null' && genres !== 'undefined' && genres) { genresList = [].concat(genres); }
    if (search) { query.search = search }
    if (shuffle === 'true') { query.shuffle = true } 
    try
    {
        const animeList = await Anime.GetAll(query);
    
        const newAnimeDataList =  await Promise.all(
            animeList.map(async (element, index) => {
                const newElement = await CombineDBJSON.CombineAnimeData(element);
                if(genresList)
                {   
                    if(genresList.some((genre) => { return newElement.genres.some((elementGenre) => { return genre.toLowerCase() === elementGenre.toLowerCase() })}))
                    {
                        return newElement
                    }
                    return null;
                }
                return newElement
            })
        );
        const animeListNoNull = newAnimeDataList.filter((el) => { return el !== null}); //needed because of mapping to null some elements upon genre
        res.status(200).json(animeListNoNull);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function GetSingleAnime(req, res)
{
        const { animeID } = req.params;
        try
        {
            const anime = await Anime.GetByID(animeID);
            const animeFullData = await CombineDBJSON.CombineAnimeData(anime);
            res.status(200).json(animeFullData);
        }
        catch(err)
        {
            res.status(500).json({error: err.message});
        }    
}

async function GetAllGenres(req, res)
{
    try
    {
        const genreList = await Genre.GetAll();

        res.status(200).json(genreList);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function GetAnimeStreamLikes(req, res)
{
    const { streamID } = req.params;

    try
    {
        const animeStreamLikeList = await AnimeStreamLike.GetAllByStreamID(streamID);
        res.status(200).json(animeStreamLikeList);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function GetSingleGenre(req, res)
{
        const { genreName } = req.params;
        try
        {
            const genre = await Genre.GetByGenre(genreName)
            res.status(200).json(genre);
        }
        catch(err)
        {
            res.status(500).json({error: err.message});
        }    
}

async function GetAllInstallments(req, res)
{
    const { animeID } = req.query;
    const query = {}
    query.animeID = (animeID) ? animeID : false

    try
    {
        const animeInstallmentList = await AnimeInstallment.GetAll(query);

        await Promise.all(
            animeInstallmentList.map(async (element) => {
                return await CombineDBJSON.CombineInstallmentData(element);
            })
        );
        res.status(200).json(animeInstallmentList);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function GetSingleInstallment(req, res)
{
    const { isOldest } = req.query;

    const query = {}
    let isOldestValue = true;
    if (isOldest !== 'true') { isOldestValue = false; }

    const { installmentID } = req.params;
    try
    {
        const animeInstallment = await AnimeInstallment.GetByID(installmentID);
        const animeInstallmentFull = await CombineDBJSON.CombineInstallmentData(animeInstallment.toJSON());
        if(isOldestValue)
        {
            animeInstallmentFull.animeStreamList.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
        }
        else
        {
            animeInstallmentFull.animeStreamList.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        }

        res.status(200).json(animeInstallmentFull);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function GetAllAnimeStream(req, res)
{
    try
    {
        const animeStreamList = await AnimeStream.GetAll();
        const animeStreamListComb = await Promise.all(
            animeStreamList.map(async (animeStream) => { 
                const animeStreamComb = await CombineDBJSON.CombineAnimeStreamData(animeStream);
                return animeStreamComb;
            })
        );
        res.status(200).json(animeStreamListComb);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

async function GetSingleAnimeStream(req, res)
{
    const { streamID } = req.params;
    try
    {
        const animeStream = await AnimeStream.GetByID(streamID);
        const animeStreamComb = await CombineDBJSON.CombineAnimeStreamData(animeStream);
        res.status(200).json(animeStreamComb);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

const animeController = {
    GetAllAnime,
    GetSingleAnime,
    GetAllGenres,
    GetAnimeStreamLikes,
    GetSingleGenre,
    GetAllInstallments,
    GetSingleInstallment,
    GetAllAnimeStream,
    GetSingleAnimeStream,
}

module.exports = animeController;

/*
async function GetAllAnimeIDInstallments(req, res)
{
    const { animeID } = req.params;
    try
    {
        const animeInstallmentList = await AnimeInstallment.GetAllByAnimeID(animeID);
    
        await Promise.all(
            animeInstallmentList.map(async (element) => {
                return await CombineInstallmentAnimeData(element);
            })
        );
        res.status(200).json(animeInstallmentList);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}
*/