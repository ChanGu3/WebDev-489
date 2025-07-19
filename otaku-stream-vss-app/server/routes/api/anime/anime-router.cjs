const express = require('express');
const animeRouter = express.Router()
const animeController = require('../../../controllers/api-controllers/anime/anime-controller.cjs');
const authorizeController = require('../../../controllers/api-controllers/authorize-controller.cjs');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })

animeRouter.get('/', animeController.GetAllAnime);

animeRouter.get('/installment', animeController.GetAllInstallments);

animeRouter.get('/genre', animeController.GetAllGenres);

animeRouter.get('/genre/:genreName', animeController.GetSingleGenre);

animeRouter.get('/stream', animeController.GetAllAnimeStream);

animeRouter.get('/stream/:streamID', animeController.GetSingleAnimeStream);

animeRouter.get('/stream/:streamID/like', animeController.GetAnimeStreamLikes);

animeRouter.get('/installment/:installmentID', animeController.GetSingleInstallment);

animeRouter.get('/:animeID', animeController.GetSingleAnime);

// self note if i ever look at this repo again i should have setup the api a little more organized and used authorization like this instead of however ive been doing it yeah i don't know why i didn't do it first just didn't think of it but sadge

animeRouter.post('/', 
    authorizeController.AuthorizeAdmin, 
    upload.fields([
        {name: 'animeCover', maxCount: 1},
        {name: 'animeStreamCover', maxCount: 1}]),
    animeController.AddAnimeMovieToDB,
);
 
animeRouter.put('/', 
    authorizeController.AuthorizeAdmin, 
    upload.fields([
        {name: 'animeCover', maxCount: 1},
        {name: 'animeStreamCover', maxCount: 1}]),
    animeController.UpdateAnimeMovieFromDB,
);

animeRouter.delete('/', 
    authorizeController.AuthorizeAdmin, 
    upload.any(), 
    animeController.DeleteAnimeMovieFromDB);

//animeRouter.get('/:animeID/installments', animeController.GetAllAnimeIDInstallments);


module.exports = animeRouter;