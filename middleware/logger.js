// This is an example of custom middleware, please remove it or replace the code with your work

function log(req, res, next) {
    console.log("Request received!");
    // Call the next function
    next();
}

module.exports = log;