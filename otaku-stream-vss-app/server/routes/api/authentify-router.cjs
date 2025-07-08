const express = require('express');
const authentifyRouter = express.Router()
const controller = require('../../controllers/authentify-controller.cjs');

//
// Sign In
//
authentifyRouter.post('/signin', controller.AttemptSignIn)

//
// Sign Out
//
authentifyRouter.post('/signout', controller.AttemptSignOut);

//
// Sign Up
//
authentifyRouter.use('/signup', controller.AttemptSignUp, controller.AttemptSignIn);


module.exports = authentifyRouter;