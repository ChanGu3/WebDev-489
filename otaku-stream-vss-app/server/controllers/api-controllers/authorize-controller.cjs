const db = require('../../db/db.cjs');

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

    res.status(403).json({error: "Not Authorized"});
}

const AuthorizeController = {
    AuthorizeMember,
};

module.exports = AuthorizeController;