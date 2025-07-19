const CombineDBJSON = require('../../helper/combine-dbjson.cjs');
const { Anime } = require('../../../models/Anime/Anime.cjs');
const { AnimeInstallment } = require('../../../models/Anime/AnimeInstallment.cjs');
const { AnimeStream } = require('../../../models/Anime/AnimeStream.cjs');
const { AnimeStreamLike } = require('../../../models/Anime/AnimeStreamLike.cjs')
const { Genre } = require('../../../models/Anime/Genre.cjs');
const path = require('path');
const { uploads } = require('../../../server-uploads.cjs');
const { AnimeGenre, AnimeOtherTranslation } = require('../../../db/db.cjs');
const { Logging } = require('../../../server-logging.cjs');
const { sequelize } = require('../../../db/db.cjs');

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
    let isOldestValue = false;
    if (isOldest !== 'true') { isOldestValue = true; }

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

async function AddAnimeMovieToDB(req, res)
{
    try
    {
        const animeData = JSON.parse(req.body.anime);
        const animeStreamData = JSON.parse(req.body.stream);

        const animeCover = req.files['animeCover'][0];
        const animeStreamCover = req.files['animeStreamCover'][0];

        if(!(animeData) || !(animeStreamData) || !(animeCover) || !(animeStreamCover))
        {
            res.status(400).json({error: "missing data within request"});
            return;
        }

        const date = new Date().toISOString().replaceAll(':','-').replaceAll('.', '_');
        const animeFileName = `${date}_${animeCover.originalname}`;
        const anime = await Anime.AddToDB(animeData.title, animeData.description, animeData.copyright, animeData.originalTranslation, animeFileName);
        
        for (const genre of animeData.genres)
        {
            await AnimeGenre.AddToDB(anime.id, genre); 
        }

        for (const otherTranslation of animeData.otherTranslations)
        {
            await AnimeOtherTranslation.AddToDB(anime.id, otherTranslation);
        }

        const animeRelativePath = `${anime.id}`

        try
        {
            const animeInstallment = await AnimeInstallment.AddToDB(anime.id, animeStreamData.title, false, null);

            try
            {
                const animeStreamFileName = `${date}_${animeStreamCover.originalname}`;
                const animeStream = await AnimeStream.AddToDB(anime.id, animeInstallment.id, animeStreamData.title, true, 1, animeStreamData.synopsis, animeStreamData.releaseDate, animeStreamFileName);
                const animeStreamRelativePath = path.join(`${anime.id}`, `${animeInstallment.id}`, `${animeStream.title}`);

                try
                {
                    await uploads.UploadAnimeFile(animeRelativePath, animeFileName, animeCover.buffer);
                    await uploads.UploadAnimeFile(animeStreamRelativePath, animeStreamFileName, animeStreamCover.buffer);

                    res.status(200).json({success: "successfully added the anime movie!"});
                }
                catch(err)
                {
                    await AnimeStream.RemoveFromDB(animeStream.id);
                    throw new Error(err);
                }
            }
            catch(err)
            {
                await AnimeInstallment.RemoveFromDB(animeInstallment.id);
                throw new Error(err);
            }
        }
        catch(err)
        {
            await Anime.RemoveFromDB(anime.id);
            throw new Error(err);
        }
    }
    catch(err)
    {
        Logging.LogError(`could not add the anime movie to the db - ${err}`);
        res.status(400).json({error: `could not add the anime movie to the db - server error`});
    }

}

async function UpdateAnimeMovieFromDB(req, res)
{
    // oh how i wish i knew they had transactions like this using sequelize 
    const transaction = await sequelize.transaction();

    try
    {
        const animeData = JSON.parse(req.body.anime);
        const animeStreamData = JSON.parse(req.body.stream);

        if(!(animeData) || !(animeStreamData))
        {
            res.status(400).json({error: "missing data within request"});
            return;
        }

        const newDate = new Date().toISOString().replaceAll(':','-').replaceAll('.', '_');

        let animeCover = null;
        let animeFileName = null;
        if (req.files['animeCover'])
        {
            animeCover = req.files['animeCover'][0];
            animeFileName = `${newDate}_${animeCover.originalname}`;
        }

        let animeStreamCover = null;
        let animeStreamFileName = null;
        if(req.files['animeStreamCover'])
        {
            animeStreamCover = req.files['animeStreamCover'][0];
            animeStreamFileName = `${newDate}_${animeStreamCover.originalname}`;
        }
        
        const anime = await Anime.GetByID(animeData.id);
        const installment = await AnimeInstallment.GetByID(animeStreamData.installmentID);
        const stream = await AnimeStream.GetByID(animeStreamData.id);

        
        const animeUpdate = {}
        if(animeData.title !== anime.title) { animeUpdate.title = animeData.title; }
        if(animeData.description !== anime.description) { animeUpdate.description = animeData.description; }
        if(animeData.copyright !== anime.copyright) { animeUpdate.copyright = animeData.copyright; }
        if(animeData.originalTranslation !== anime.originalTranslation) { animeUpdate.originalTranslation = animeData.originalTranslation; }
        if(animeFileName) { animeUpdate.coverFilename = animeFileName; }

        await Anime.UpdateInDB(anime.id, animeUpdate, transaction)
        
        await AnimeGenre.RemoveAllByAnimeIDFromDB(anime.id, transaction);
        for (const genre of animeData.genres)
        {
            await AnimeGenre.AddToDB(anime.id, genre, transaction); 
        }

        await AnimeOtherTranslation.RemoveAllByAnimeIDFromDB(anime.id, transaction);
        for (const otherTranslation of animeData.otherTranslations)
        {
            await AnimeOtherTranslation.AddToDB(anime.id, otherTranslation, transaction);
        }

        ///
        const installmentUpdate = {}
        if (installment.title !== animeStreamData.title) { installmentUpdate.title = animeStreamData.title}
        await AnimeInstallment.UpdateInDB(animeStreamData.installmentID, installmentUpdate, transaction);

        const animeStreamUpdate = {}
        if(stream.title !== animeStreamData.title) { animeStreamUpdate.title = animeStreamData.title; }
        if(stream.synopsis !== animeStreamData.synopsis) { animeStreamUpdate.synopsis = animeStreamData.synopsis; }
        if(stream.releaseDate !== animeStreamData.releaseDate) { animeStreamUpdate.releaseDate = animeStreamData.releaseDate; }
        if(animeStreamFileName) { animeStreamUpdate.coverFilename = animeStreamFileName; }

        const animeStream = await AnimeStream.UpdateInDB(animeStreamData.id, animeStreamUpdate, transaction);

        if(animeCover)
        {
            const animeRelativePath = `${animeData.id}`;

            await uploads.DeleteAnimeFile(animeRelativePath, animeFileName);
            await uploads.UploadAnimeFile(animeRelativePath, animeFileName, animeCover.buffer);
        }

        if(animeStreamCover)
        {
            const animeStreamRelativePath = path.join(`${animeData.id}`, `${animeStreamData.installmentID}`, `${animeStreamData.title}`);

            await uploads.DeleteAnimeFile(animeStreamRelativePath, animeStreamFileName);
            await uploads.UploadAnimeFile(animeStreamRelativePath, animeStreamFileName, animeStreamCover.buffer);
        }

        transaction.commit();
        res.status(200).json({success: "successfully updated the anime movie!"});
    }
    catch(err)
    {
        transaction.rollback();
        Logging.LogError(`could not update the anime movie in the db - ${err}`);
        res.status(500).json({error: `could not update the anime movie in the db - server error`});
    }

}

async function DeleteAnimeMovieFromDB(req, res)
{
    try
    {
        const { animeID } = req.body;
        await Anime.RemoveFromDB(animeID);
        res.status(200).json({success: `successfully deleted the anime movie from the db`});
    }
    catch(err)
    {
        Logging.LogError(`could not delete the anime movie from the db - ${err}`);
        res.status(400).json({error: `could not delete the anime movie from the db - server error`});
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
    AddAnimeMovieToDB,
    UpdateAnimeMovieFromDB,
    DeleteAnimeMovieFromDB,
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