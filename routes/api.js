const router = require("express").Router();
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const passport = require("passport");

const jwtAuth = require("../middleware/jwt-auth");


// Debugger for api
const debug_api = require("debug")("api");

// Load the model and database
require("../models/User");
require("../config/passport");

const User = mongoose.model("User");


// Connect the database
mongoose.connect("mongodb://localhost/mithongTestDatabase", { useNewUrlParser: true, useCreateIndex: true})
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => console.log(err));



// ========================= ROUTES ==============================
// Route to create a new user, everyone can access
router.post(["/newUser"], jwtAuth.optional, (req, res) => {
    // Validate the request
    const { error } = validateNewUserRequest(req.body);
    
    if (error) {
        // Bad request
        res.status(400).send(error.message);
    } else {
        // Create new User based on the req body data
        const user = new User(req.body);
        // Set the password using the user input
        user.setPassword(req.body.password);

        // Save user
        user.save()
            .then(() => {
                // Create the authentication JSON with JWT for this user and send back
                console.log(user);
                res.json(user.toAuthJSON());
            })
            .catch((error) => {
                res.status(400).send(error.message);
            });
    }
});

// Route to login, everyone can access
router.post(["/login"], jwtAuth.optional, (req, res, next) => {
    const { body: { username, password } } = req;
    
    // Only proces if username and password are both submitted
    if (!username || !password) {
        res.status(400).json(
            {
                errors: {
                    message: "No username or password provided"
                }
            }
        );
    } else {
        // Process the authentication using passportJS
        // Reference: http://www.passportjs.org/docs/authenticate/
        passport.authenticate('local', {session: false}, function(err, user, info) {
            // If authentication give an error
            if (err) {
                return next(err);
            }
            // If there is no user returned, which mean
            if (!user) {
                return res.status(400).json(info);
            }

            // Normal authentication done
            return res.json({ user: user.toAuthJSON()});
        })(req, res, next);
    }

});

//GET current route (required, only authenticated users have access)
router.get('/current', jwtAuth.required, (req, res, next) => {
    // Get the id of the current user in the payload of reqest AFTER processed by jwtAuth middleware
    // It can only reached this part if authentication is successful (the JWT is valid)
    const { payload: { id } } = req;

    // Find the user ID in database
    return User.findById(id)
        .then((user) => {
            if (!user) {
                return res.status(400).json({
                    errors: {
                        message: "No user found"
                    }
                });
            }
            // User found, return to request
            return res.json({ user: user.toAuthJSON() });
        });
});

// ================== HELPER METHODS ===========================
// Schema validation for request
const { MAJORS_LIST, GENDERS_LIST } = require("../models/User");

debug_api("MAJOR LIST: " + MAJORS_LIST);
debug_api("GENDER LIST: " + GENDERS_LIST);

const user_validation_schema = {
    // Basic validation to make sure all required field presented
    username: Joi.string().min(3).max(25).required(),
    lastname: Joi.string().required(),
    firstname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    // Optional data
    dateOfBirth: Joi.date().optional(),
    profilePic: Joi.optional(),
    gender: Joi.optional().valid(GENDERS_LIST)
            .error(new Error("Your gender value is not in the allowed values list: " + GENDERS_LIST)),
    address: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    major: Joi.optional().valid(MAJORS_LIST)
            .error(new Error("Your major value is not in the allowed values list: " + MAJORS_LIST)),
    khoa: Joi.number().min(1).optional(),
}

/**
 * Method to validate whether the request body contains valid user
 * @param {request body} userData The data of the user in the request body
 * 
 * Return an object contain error object if any condition failed
 */
function validateNewUserRequest(userData) {
    return Joi.validate(userData, user_validation_schema);
}

// ========================== EXPORTS ==============================


module.exports = router;