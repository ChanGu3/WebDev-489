const chalk = require('chalk');
const db = require('../../db/db.cjs');

async function AttemptSignIn(req, res) {
  // user already exists sign in just take them to home bypasses sign in entirely -- WONT NEED THIS WHEN BLOCKING SIGN IN ENTIRELY
  if(req.session && req.session.user)
  {
    res.status(200).end();
    return;
  }


    const { email, password } = req.body;
    
    try
    {
      const user = await db.Member.Authentification(email, password);
      const userJSON = user.toJSON();
      req.session.user = {};
      req.session.user.email = userJSON.email
      //req.session.member_id = user.id;
      const newSession = await db.Session.AddToDB(req.sessionID, userJSON.email);
      res.status(200).end();
    }
    catch(err)
    {
      res.clearCookie('connect.sid');
      res.status(400).json({error: err.message});
    }
}

async function AttemptSignOut(req, res)
{
    try
    {
      const tempSessionID = req.sessionID;
      await db.Session.RemoveSessionByID(req.sessionID);
      await new Promise((resolve, reject) => {
        req.session.destroy((err) => {
          if(err)
          {
            reject(new Error("session could not be destroyed"));
          }
          else
          {
            res.clearCookie('connect.sid');
            resolve();
          }
        });
      });
      res.status(200).end();
      console.log(chalk.magenta(`[otakustream] successfully removed session with id:{${tempSessionID}} from client and server`));
    }
    catch(err)
    {
      res.status(500).json({error: err.message});
    }
}

async function AttemptSignUp(req, res, next)
{
  const {email, password} = req.body;

  try
  {
    const newMember = await db.Member.AddToDB(email, password);
    next();
  }
  catch(err)
  {
    res.status(502).json({error: err.message});
  }
}

const AuthentifyContoller = {
    AttemptSignIn,
    AttemptSignOut,
    AttemptSignUp,
};

module.exports = AuthentifyContoller;