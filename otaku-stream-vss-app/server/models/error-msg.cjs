const fallback = "Server Error - please try again later";
const emailExists = "Email Already Exists - please sign in or use a different email";
const authorizationFail = "email or password is invalid please try again";
const sessionDoesNotExist = "session does not exists so could not retrieve email"

const ErrorMsg = {
    fallback,
    emailExists,
    authorizationFail,
    sessionDoesNotExist,
}

module.exports = ErrorMsg;