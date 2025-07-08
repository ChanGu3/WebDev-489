const db = require('../db/db.cjs');

async function AuthorizeMember(req, res, next) 
{
    try
    {
        if(req.session.user)
        {
            if (await db.Member.Exists(req.session.user.email))
            {
                next();
                return;
            }
        } 
    }
    catch(err){}

    res.status(403).end();
}

async function AllowedRoutes(req, res, next) 
{
    res.status(200).json();
}

async function SetupNavbar(req, res, next) 
{
    res.status(200).json({user: { email: req.session.user.email } });
}


const AuthorizeController = {
    AuthorizeMember,
    AllowedRoutes,
    SetupNavbar,
};

module.exports = AuthorizeController;