const express = require('express');
const adminRouter = express.Router()
const controller = require('../../controllers/api-controllers/admin-controller.cjs');

//
// success authorization
//
adminRouter.get('/', (req, res) => { res.status(200).json({success: "authorized"})} );


adminRouter.get('/analytics/anime/streams', controller.GetAllAnalyticAnimeStream)

adminRouter.get('/members', controller.GetAllMembers);
adminRouter.get('/members/:email', controller.GetSingleMember);
//
//  Admin member manipulation
//
adminRouter.put('/members/:email/ban', controller.UpdateBan);


module.exports = adminRouter;