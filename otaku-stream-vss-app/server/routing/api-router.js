const express = require('express');
const apiRouter = express.Router()

// simple api example route
apiRouter.get('/Example', (req, res) => {
  res.json({ message: 'Hello from the API' });
})

module.exports = apiRouter;