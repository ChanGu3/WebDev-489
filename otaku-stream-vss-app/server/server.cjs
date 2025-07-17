const path = require('path');
const { Logging } = require('./server-logging.cjs');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const isDev = (argv.dev === true || argv.d === true);
(isDev) ? Logging.LogProcess("in development process"): Logging.LogProcess(" in production process");


const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const controller = require('./controllers/server-controller.cjs');
const apiRouter = require('./routes/api/api-router.cjs');
const uploadsRouter = require('./routes/uploads-router.cjs');
const database = require('./db/db.cjs'); // Need this imported here!!!

const sessionSecretKey = 'some-key'

const app = express();

//
// - For Development
//
if (isDev)
{
  const cors = require('cors');
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true               
  }));
}
app.use(cookieParser(sessionSecretKey));
app.use(session({
  secret: sessionSecretKey,       
  resave: false,                   
  saveUninitialized: false,
  rolling: true,       
  cookie: {
    maxAge: 1000 * 60 * 45, // 45 minutes
    httpOnly: true,
    secure: false,        
  }
}));

//
// - Enables JSON Traffic -
//
app.use(express.json());

//
// - Uploads Routing -
//
app.use('/uploads', uploadsRouter);

//
// - API Routing -
//
app.use('/api', apiRouter);

//
// - Serves Static Files From Build -
//
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

//
// - Resets Session Based On Session Existence In Database - 
//
app.use(controller.CookieChecker);

//
// - Serves URL Routes From Build -
//
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

//
// - SERVER PORT -
//
const PORT = 3000;
app.listen(PORT, () => {
  Logging.LogProcess(`server running on http://localhost:${PORT}`);
});