const path = require('path');
const fs = require('fs').promises;
const { Logging, errormsg } = require('./server-logging.cjs');
const multer = require('multer');

const pathDev = path.join(__dirname, 'dev');
const pathImages = path.join(pathDev, 'images')
const pathUploads = path.join(__dirname, "uploads");
const pathAnime = path.join(pathUploads, "anime");

//
// dirpath should be a path starting from upload so to make a directory in upload called hello just do "test" nested must be path.join("test","child");
//
async function mkDir(relativePath)
{
    try
    {
        if(!(await doesAnimePathExist(relativePath)))
        {
            const fullPath = path.join(pathAnime, relativePath);
            await fs.mkdir(fullPath , {recursive: true});
            return relativePath;
        }
    }
    catch(err)
    {
        Logging.LogError(`could not make directory for ${relativePath} ${err}`);
        throw new Error(`${err}`);
    }
}

async function rnDir(prevRelativePath, relativePath)
{
    try
    {
        if(!(await doesAnimePathExist(prevRelativePath)))
        {
            const oldFullPath = path.join(pathAnime, prevRelativePath);
            const newFullPath = path.join(pathAnime, relativePath);
            await fs.rename(oldFullPath, newFullPath);  mkdir(fullPath , {recursive: true});
            return relativePath;
        }
    }
    catch(err)
    {
        Logging.LogError(`could not rename directory from ${prevRelativePath} to ${relativePath} ${err}`);
        throw new Error(`${err}`);
    }
}

//
// true or false if found
//
async function doesAnimePathExist(relativePath)
{
    try
    {
        const fullPath = path.join(pathAnime, relativePath);
        await fs.access(fullPath);
        return true;
    }
    catch(err)
    {
        //Logging.LogWarning(`could not find if path ${dirpath} exists in uploads`);
        return false;
    }
}

//
// true or false if found
//
async function doesUploadPathExist(relativePath)
{
    try
    {
        const fullPath = path.join(pathUploads, relativePath);
        await fs.access(fullPath);
        return true;
    }
    catch(err)
    {
        //Logging.LogWarning(`could not find if path ${dirpath} exists in uploads`);
        return false;
    }
}

//
//
//
async function recursiveDirDeleteInAnime(relativePath)
{
    try 
    {
        if(!relativePath.includes('.') && relativePath.length !== 0 && await doesAnimePathExist(relativePath))
        {
            const fullpath = path.join(pathAnime, relativePath);
            await fs.rm(fullpath, {recursive: true, force: true});
        }
        else
        {
            Logging.LogError(`could not delete path ${relativePath} --- ${err}`);
        }
    }
    catch(err)
    {
        Logging.LogError(`could not delete path ${relativePath} --- ${err}`);
        throw new Error(`${err}`);
    }
}

function GetAnimePath(relativePath)
{
    return path.join(pathAnime, relativePath);
}

function GetUploadPath(relativePath)
{
    return path.join(pathUploads, relativePath);
}

//
// deletes anime cover
//
async function DeleteAnimeFile(relativePath, fileName)
{
    try
    {
        if(!(await doesAnimePathExist(relativePath)))
        {
            const fullPath = path.join(pathAnime, relativePath, fileName);
            await fs.rm(fullPath, {force: true})
            return fullPath;
        }
        else
        {
            return "file does not exist"
        }
    }
    catch(err)
    {
        Logging.LogError(`could not delete file:${fileName} from relativepath:${relativePath} --- ${err}`);
        throw new Error(`${err}`);
    } 
}

//
// uploads anime cover
//
async function UploadAnimeFile(relativePath, fileName, buffer)
{
    try
    {
        if(await doesAnimePathExist(relativePath))
        {
            const fullPath = path.join(pathAnime, relativePath, fileName);
            await fs.writeFile(fullPath, buffer, {flush: true}) 
            return fullPath;
        }
    }
    catch(err)
    {
        Logging.LogError(`could not upload file ${fileName} to relativepath:${relativePath} --- ${err}`);
        throw new Error(`${err}`);
    } 
}

/*
const animeCover = multer.diskStorage({
        destination: (req, file, cb) => {

            // anime must be sent from previous middle ware
            if(req.anime)
            {

            } 
        },
        filename: (req, file, cb) => {

        },
});
*/

const uploads = {
    mkDir,
    rnDir,
    doesAnimePathExist,
    doesUploadPathExist,
    recursiveDirDeleteInAnime,
    GetUploadPath,
    GetAnimePath,
    DeleteAnimeFile,
    UploadAnimeFile,
}

//
//
//
async function clearAnimeFolder()
{
    try 
    {
        if(!pathAnime.includes('.') && await doesUploadPathExist('anime'))
        {
            await fs.rm(pathAnime, {recursive: true, force: true});
            await fs.mkdir(pathAnime, {recursive: true});
            Logging.LogDev(`anime folder successfully cleared`);
        }
        else
        {
            Logging.LogDev(`could not clear anime folder`);
        }
    }
    catch(err)
    {
        Logging.LogDev(`could not clear anime folder --- ${err}`);
    }
}

async function CopyImageFileToAnimePath(existingFileName, relativePath)
{
    try
    {
        await fs.copyFile(path.join(pathImages, existingFileName), path.join(pathAnime, relativePath));
    }
    catch(err)
    {
        Logging.LogError(`could not copy file to anime path:${relativePath} | ${err}`);
    }
}

const uploadsDev = {
    clearAnimeFolder,
    CopyImageFileToAnimePath,
}


module.exports.uploads = uploads;
module.exports.uploadsDev = uploadsDev;