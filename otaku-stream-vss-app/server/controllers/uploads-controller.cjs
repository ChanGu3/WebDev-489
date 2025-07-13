const path = require('path');
const { uploads } = require('../server-uploads.cjs');

async function GetAnimeSeriesCover(req, res)
{
    const { animeID, filename } = req.params;
    const relativePath = path.join(animeID, filename);
    const filePath = uploads.GetAnimePath(relativePath);

    try
    {
        if(!await uploads.doesAnimePathExist(relativePath))
        {   
            res.status(404).end();
        }
        res.status(200).sendFile(filePath);
    }
    catch(err)
    {
        res.status(404).end();
    }
}

async function GetAnimeStreamCover(req, res)
{
    //anime, series/movie, episode/movie, coverofthestream
    const { animeID, installmentID, streamID, filename } = req.params;
    const relativePath = path.join(animeID, installmentID, streamID, filename);
    const filePath = uploads.GetAnimePath(relativePath);

    try
    {
        if(!await uploads.doesAnimePathExist(relativePath))
        {   
            res.status(404).end();
        }
        res.status(200).sendFile(filePath);
    }
    catch(err)
    {
        res.status(404).end();
    }
}

const UploadsController = {
    GetAnimeSeriesCover,
    GetAnimeStreamCover
};

module.exports = UploadsController;