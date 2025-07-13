const express = require('express');
const apiRouter = express.Router()
const authentifyRouter = require('./authentify-router.cjs');
const authorizeRouter = require('./authorize-router.cjs');
const animeRouter = require('./anime/anime-router.cjs');

// simple api example route
apiRouter.get('/Example', (req, res) => {
  res.json({ message: 'Hello from the API' });
})

apiRouter.use('/authentify', authentifyRouter);

apiRouter.use('/authorize', authorizeRouter);

apiRouter.use('/anime', animeRouter);

module.exports = apiRouter;