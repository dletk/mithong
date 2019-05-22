const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = mongoose.model("User");

// Using the local strategy because we are using normal HTML form
// Reference: http://www.passportjs.org/docs/configure/  and https://github.com/jaredhanson/passport-local
passport.use(new LocalStrategy({
    // Specify the name of these fields in the request body for passport to extract information
    usernameField: "username",
    passwordField: "password",
}, (username, password, done) => {
    // Find the user with the input username, there should be only at most 1 in the database
    User.findOne({username: username})
        .then(user => {
            // The case no user in database or invalid password
            if (!user || !user.validatePassword(password)) {
                return done(null, false, {error: "Invalid username or password"});
            } else {
                // Successful authentication
                return done(null, user)
            }
        }).catch(err => {return done(err)});
}))