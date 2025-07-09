const processName = "otakustream";
const chalk = require('chalk')

const fallback = "Server Error - please try again later";
const emailExists = "Email Already Exists - please sign in or use a different email";
const authorizationFail = "email or password is invalid please try again";
const sessionDoesNotExist = "session does not exists so could not retrieve email"


function LogProcess(msg)
{
    console.log(chalk.cyan(`[${processName}] ${msg}`));
}

function LogSuccess(msg)
{
    console.log(chalk.magenta(`[${processName}] ${msg}`));
}

function LogWarning(msg)
{
    console.warn(chalk.yellow(`[warn - ${processName}] ${msg}`));
}

function LogError(msg)
{
    console.error(chalk.red(`[err - ${processName}] ${msg}`));
}

function LogDev(msg)
{
    console.log(chalk.yellowBright(`[dev - ${processName}] ${msg}`));
}

const errormsg = {
    fallback,
    emailExists,
    authorizationFail,
    sessionDoesNotExist,
}

const Logging = {
    LogProcess,
    LogSuccess,
    LogWarning,
    LogError,
    LogDev
}

module.exports.errormsg = errormsg;
module.exports.Logging = Logging;