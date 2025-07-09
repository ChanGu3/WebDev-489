const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
const { Logging, errormsg } = require('./server-logging.cjs');
const pathUploads = path.join(__dirname, "uploads");
const pathAnime = path.join(pathUploads, "anime");

//
// dirpath should be a path starting from upload so to make a directory in upload called hello just do "test" nested must be path.join("test","child");
//
async function mkDir(dirpath)
{
    try
    {
        if(!(await doesDirExist(dirpath)))
        {
            const fullPath = path.join(pathAnime, dirpath);
            await fs.mkdir(fullPath , {recursive: true});
            return dirpath;
        }
    }
    catch(err)
    {
        Logging.LogError(`could not make directory for ${dirpath} ${err}`);
        throw new Error(`${err}`);
    }
}

//
// true or false if found
//
async function doesDirExist(dirpath)
{
    try
    {
        const fullPath = path.join(pathAnime, dirpath);
        await fs.access(fullPath);
        return true;
    }
    catch(err)
    {
        Logging.LogWarning(`could not find if path ${dirpath} exists in uploads`);
        return false;
    }
}

//
//
//
async function recursiveDirDeleteInAnime(dirpath)
{
    try 
    {
        if(!dirpath.includes('.') && dirpath.length === 0 && await doesDirExist(dirpath))
        {
            const fullpath = path.join(pathAnime, dirpath);
            await fs.rm(fullpath, {recursive: true, force: true});
        }
    }
    catch(err)
    {
        Logging.LogError(`could not delete path ${dirpath} --- ${err}`);
        throw new Error(`${err}`);
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
    },
    filename: (req, file, cb) => {

    },
});

const uploads = {
    mkDir,
    doesDirExist,
    recursiveDirDeleteInAnime,
    storage, 
}

const dev = {

}

module.exports.uploads = uploads;
module.exports.dev = dev;