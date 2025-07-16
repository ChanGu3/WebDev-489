const express = require('express');
const apiRouter = express.Router()
const authentifyRouter = require('./authentify-router.cjs');
const authorizeRouter = require('./authorize-router.cjs');
const animeRouter = require('./anime/anime-router.cjs');
const billingRouter = require('./billing-router.cjs');
const premiumRouter = require('./premium-router.cjs');
const savedCardRouter = require('./saved-card-router.cjs');

// simple api example route
apiRouter.get('/Example', (req, res) => {
  res.json({ message: 'Hello from the API' });
})

apiRouter.use('/authentify', authentifyRouter);

apiRouter.use('/authorize', authorizeRouter);

apiRouter.use('/anime', animeRouter);

apiRouter.use('/billing', billingRouter);

apiRouter.use('/premium', premiumRouter);

apiRouter.use('/saved-cards', savedCardRouter);

module.exports = apiRouter;