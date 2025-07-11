const express = require('express');
const memberRouter = express.Router()
const controller = require('../../controllers/api-controllers/member-controller.cjs');

//
// 
//
memberRouter.get('/', (req, res) => { res.status(200).json({success: "authorized"})} );

//
// 
//
memberRouter.get('/anime/favorite', controller.GetAllAnimeFavorite);

memberRouter.post('/anime/favorite/:animeID', controller.AddAnimeFavorite);

memberRouter.delete('/anime/favorite/:animeID', controller.RemoveAnimeFavorite);

memberRouter.post('/anime/like/:streamID', controller.AddAnimeStreamLike);

memberRouter.delete('/anime/like/:streamID', controller.RemoveAnimeStreamLike);

memberRouter.get('/anime/stream/history', controller.GetAllAnimeStreamHistory);

memberRouter.get('/anime/stream/history/:streamID', controller.GetSingleAnimeStreamHistory);

memberRouter.put('/anime/stream/history/:streamID', controller.UpdateSingleAnimeStreamHistory);

//
// routes authorization
//
memberRouter.get('/routes', controller.AllowedRoutes);

//
// Navbar member authorization
//
memberRouter.get('/navbar', controller.SetupNavbar);

module.exports = memberRouter;