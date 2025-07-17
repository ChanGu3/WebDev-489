const { Member } = require('../../models/Accounts/member.cjs');
const { AnimeStream } = require('../../models/Anime/AnimeStream.cjs');
const CombineDBJSON = require('../helper/combine-dbjson.cjs');
//
// By Default without any query value will ban member
//
async function UpdateBan(req, res)
{
    const { email } = req.params;
    const { isBanned } = req.query;
    
    const _isBanned = (isBanned === undefined || isBanned === null) ? true : (isBanned.toLowerCase() === 'false') ? false : true;

    try
    {
        await Member.UpdateBan(email, _isBanned);
        res.status(200).json({success: `member with email:${email} has been ${(_isBanned) ? 'banned' : 'unbanned'}`});
    }
    catch
    {
        res.status(500).json({error: `could not ${(_isBanned) ? 'ban' : 'unban'} member with email:${email}`});
    }
}

async function GetAllMembers(req, res)
{
    const query = {}
    const { limit, offset} = req.query;

    query.limit = 10;
    if (limit && Number(limit) !== NaN) { query.limit = Number(limit) }
    if (offset && Number(offset) !== NaN) { query.offset = Number(offset) }

    try
    {
        const membersList = await Member.GetAllMembers(query);
        const combinedMembersList = await Promise.all( membersList.map(async (member) => {
            return await CombineDBJSON.CombineMemberData(member);
        })

        );
        res.status(200).json(combinedMembersList);
    }
    catch
    {
        res.status(500).json({error: `could not get all members`});
    }
}

async function GetSingleMember(req, res)
{
    const { email } = req.params;

    try
    {
        const member = await Member.GetByEmail(email);
        const combinedMember = await CombineDBJSON.CombineMemberData(member);
        res.status(200).json(combinedMember);
    }
    catch
    {
        res.status(500).json({error: `could not get all members`});
    }
}

async function GetAllAnalyticAnimeStream(req, res)
{
    const query = {}
    const { limit, offset } = req.query;

    query.limit = 10;
    if (limit && Number(limit) !== NaN) { query.limit = Number(limit) }
    if (offset && Number(offset) !== NaN) { query.offset = Number(offset) }

    try
    {
        const animeStreamList = await AnimeStream.GetAll(query);
        const animeStreamListComb = await Promise.all(
            animeStreamList.map(async (animeStream) => { 
                const animeStreamComb = await CombineDBJSON.CombineAnalyticAnimeStreamData(animeStream);
                return animeStreamComb;
            })
        );
        res.status(200).json(animeStreamListComb);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}



const AdminController = {
    UpdateBan,
    GetAllMembers,
    GetSingleMember,
    GetAllAnalyticAnimeStream,
}

module.exports = AdminController;