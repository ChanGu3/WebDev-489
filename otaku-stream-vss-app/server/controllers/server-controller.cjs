const chalk = require('chalk');
const db = require('../db/db.cjs');

//
// - Resets Session Based On Session Existence In Database - 
//
async function CookieChecker (req, res, next) {
  if(req.signedCookies['connect.sid'] && req.signedCookies['connect.sid'] !== req.sessionID) // when user has cookie session id but that session id is no longer valid on server
  {
    try
    {
      const session = await db.Session.UpdateSessionID(req.signedCookies['connect.sid'], req.sessionID);
      req.session.user = await db.Member.GetByEmail(session.email);
      await db.Session.LogExistingSession(req.sessionID);
      console.log(chalk.magenta(`[otakustream] reset session for ${session.email}`));
    }
    catch(err)
    {
      await new Promise((resolve, reject) => {
        req.session.destroy((err) => {
          if(err)
          {
            console.error(chalk.red(`[otakustream] session could not be destroyed for id:{${req.sessionID}}`));
            reject();
          }
          else
          {
            res.clearCookie('connect.sid');
            console.log(chalk.magenta(`[otakustream] successfully cleaned up client and server cookies`));
            resolve();
          }
        });
      })
    }
  }
  else
  {
    try
    {
      if (req.signedCookies['connect.sid'] === req.sessionID)
      {
        await db.Session.LogExistingSession(req.sessionID);
      }
    }
    catch(err)
    {
      console.error(chalk.red(`[otakustream] ${err}`));
    }
  }

  next();
}

const ServerController = {
    CookieChecker,
};

module.exports = ServerController;