const express = require('express');
const apiRouter = require('./routes/api-router.cjs');
const path = require('path');

const app = express();

//
// - Static Files From Build -
//
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));


//
// - API routing -
//
app.use('/api', apiRouter);

//
// - Routing From URL Routes -
//
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

//
// - SERVER PORT -
//
app.listen(3000, () => {
  console.log(`Server running on http://localhost:${3000}`);
});