const router = require("express").Router();
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");


// Debugger for api
const debug_api = require("debug")("api");

// Load the model and database
require("../models/User");
const User = mongoose.model("User");

// Connect the database
mongoose.connect("mongodb://localhost/mithongTestDatabase", { useNewUrlParser: true, useCreateIndex: true})
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => console.log(err));



// ========================= ROUTES ==============================
router.post(["/newUser"], (req, res) => {
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
                // TODO: Create the authentication JSON with JWT for this user and send back
                console.log(user);
                res.send("Success!!!");
            })
            .catch((error) => {
                res.status(400).send(error.message);
            });
    }
})



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