const express = require('express');
const authorizeRouter = express.Router()
const controller = require('../../controllers/api-controllers/authorize-controller.cjs');
const memberRouter = require('./member-router.cjs');

//
// 
//
authorizeRouter.use('/member', controller.AuthorizeMember);
authorizeRouter.use('/member', memberRouter);


module.exports = authorizeRouter;