const express = require('express');
const animeRouter = express.Router()
const animeController = require('../../../controllers/api-controllers/anime/anime-controller.cjs');

animeRouter.get('/', animeController.GetAllAnime);

animeRouter.get('/installment', animeController.GetAllInstallments);

animeRouter.get('/genre', animeController.GetAllGenres);

animeRouter.get('/genre/:genreName', animeController.GetSingleGenre);

animeRouter.get('/stream', animeController.GetAllAnimeStream);

animeRouter.get('/stream/:streamID', animeController.GetSingleAnimeStream);

animeRouter.get('/stream/:streamID/like', animeController.GetAnimeStreamLikes);

animeRouter.get('/installment/:installmentID', animeController.GetSingleInstallment);

animeRouter.get('/:animeID', animeController.GetSingleAnime);

animeRouter.post('/:animeID', (req, res) => {
    const { animeID } = req.params;
    try
    {

    }
    catch(err)
    {

    }
    res.status(404).json({error: "Not Implemented"});
});

animeRouter.delete('/:animeID', (req, res) => {
    const { animeID } = req.params;
    try
    {

    }
    catch(err)
    {

    }
    res.status(404).json({error: "Not Implemented"});
});

//animeRouter.get('/:animeID/installments', animeController.GetAllAnimeIDInstallments);


module.exports = animeRouter;