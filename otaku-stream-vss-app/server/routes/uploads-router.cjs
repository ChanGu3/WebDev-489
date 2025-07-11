const express = require('express');
const uploadsRouter = express.Router();
const UploadsController = require('../controllers/uploads-controller.cjs');

//
//  Gets Anime Series Cover Image From uploads
//
uploadsRouter.get('/anime/:animeID/:filename', UploadsController.GetAnimeSeriesCover);

//
//  Gets Anime Stream Cover Image From uploads
//
uploadsRouter.get('/anime/:animeID/:installmentID/:streamID/:filename', UploadsController.GetAnimeStreamCover);

module.exports = uploadsRouter;