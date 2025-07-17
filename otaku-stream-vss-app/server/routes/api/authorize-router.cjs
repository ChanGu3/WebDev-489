const express = require('express');
const authorizeRouter = express.Router()
const controller = require('../../controllers/api-controllers/authorize-controller.cjs');
const memberRouter = require('./member-router.cjs');
const adminRouter = require('./admin-router.cjs');

//
// Member
//
authorizeRouter.use('/member', controller.AuthorizeMember);
authorizeRouter.use('/member', memberRouter);

//
// Admin
//
authorizeRouter.use('/admin', controller.AuthorizeAdmin);
authorizeRouter.use('/admin', adminRouter);

module.exports = authorizeRouter;