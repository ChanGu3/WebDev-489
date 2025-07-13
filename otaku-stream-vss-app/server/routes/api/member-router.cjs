const express = require('express');
const memberRouter = express.Router()
const controller = require('../../controllers/api-controllers/member-controller.cjs');

//
// success authorization
//
memberRouter.get('/', (req, res) => { res.status(200).json({success: "authorized"})} );


// FAVORITE

memberRouter.get('/anime/favorite', controller.GetAllAnimeFavorite);

memberRouter.get('/anime/favorite/:animeID', controller.GetAnimeFavorite);

memberRouter.post('/anime/favorite/:animeID', controller.AddAnimeFavorite);

memberRouter.delete('/anime/favorite/:animeID', controller.RemoveAnimeFavorite);

/// RATING

memberRouter.get('/anime/:animeID/rating', controller.GetAnimeRating);

memberRouter.post('/anime/:animeID/rating', controller.AddAnimeRating);

memberRouter.put('/anime/:animeID/rating', controller.UpdateAnimeRating);

memberRouter.delete('/anime/:animeID/rating', controller.RemoveAnimeRating);

/// LIKE

memberRouter.get('/anime/like/:streamID', controller.GetAnimeStreamLike);

memberRouter.post('/anime/like/:streamID', controller.AddAnimeStreamLike);

memberRouter.delete('/anime/like/:streamID', controller.RemoveAnimeStreamLike);

/// HISTORY

memberRouter.get('/anime/stream/history', controller.GetAllAnimeStreamHistory);

memberRouter.get('/anime/stream/history/:streamID', controller.GetSingleAnimeStreamHistory);

memberRouter.put('/anime/stream/history/:streamID', controller.UpdateSingleAnimeStreamHistory);

//
// Navbar member authorization
//
memberRouter.get('/navbar', controller.SetupNavbar);

module.exports = memberRouter;