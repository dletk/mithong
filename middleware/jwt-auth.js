// Middleware for jwt-authentication

const expressJWT = require("express-jwt");
const config = require("config");

// The secret_key should be set using config environment
const SECRET_KEY = String(config.get("jwt_secret_key"));

/**
 * Method to extract the JWT token from request header
 * @param {request} req the request object
 */
function getTokenFromHeader(req) {
    // Get the authorization clause from req header
    const { headers: { authorization}} = req;

    // Our authorization clause has a value with format: <Token> <ACTUAL VALUE>
    if (authorization && authorization.split(" ")[0] === "Token") {
        // Extract the token
        return authorization.split(" ")[1];
    }
    return null;
}

// Create 2 different type of authentication, with and without credentials
const jwtAuth = {
    required: expressJWT({
        secret: SECRET_KEY,
        userProperty: "payload",
        getToken: getTokenFromHeader
    }),
    optional: expressJWT({
        secret: SECRET_KEY,
        userProperty: "payload",
        getToken: getTokenFromHeader, 
        credentialsRequired: false
    })
}


// ========================== EXPORTS ==============================


module.exports = jwtAuth;
