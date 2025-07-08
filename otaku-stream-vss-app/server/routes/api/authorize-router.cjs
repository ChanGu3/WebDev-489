const express = require('express');
const authorizeRouter = express.Router()
const controller = require('../../controllers/authorize-controller.cjs');


//
// 
//
authorizeRouter.use('/member', controller.AuthorizeMember);

//
// routes authorization
//
authorizeRouter.get('/member/routes', controller.AllowedRoutes);

//
// Navbar member authorization
//
authorizeRouter.get('/member/navbar', controller.SetupNavbar);

module.exports = authorizeRouter;