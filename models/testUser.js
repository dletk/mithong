const mongoose = require("mongoose");

// Use the debugger as follow in terminal: DEBUG=model:user nodemon/node/... testUser.js
const debug_model_user = require("debug")("model:user");


mongoose.connect("mongodb://localhost/mithongTestDatabase", {useNewUrlParser: true})
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));

require("./User");
const User = mongoose.model("User");


async function testCreatedUser() {
    var duc = User({ username: "duc", lastname: "Le", firstname: "Duc", email: "duclmas@gmail.com" });

    duc.setPassword("123456");

    const result = await duc.save();

    console.log("======= Created User =======");

    // Callback function to get the validation result
    function isValidated(validated) {
        console.log("===> Validation value:\n" + validated);
        if (validated) {
            console.log("Password correct!");
        } else {
            console.log("Wrong password, try again");
        }
    }

    // Callback function to print out the data used for validation
    // ONLY for debugging purpose
    function getValidationData(correct, input) {
        debug_model_user(`===> Correct value:\n${correct}`);
        debug_model_user(`===> Input value:\n${input}`);
    }

    setTimeout(() => {
        if (process.env.DEBUG == "model:user") {
            User.validatePassword(duc, "123456", getValidationData);
        } else {
            // Using the callback to print out the validation data
            User.validatePassword(duc, "123456", isValidated);
        }
    }, 2000);
}

async function testAuthenticateUser(username, password) {
    try {
        const user = await User.findOne({username: username});
        console.log(`Queried user: ${user}`);
        if (!user || !user.validatePassword(password)) {
            console.log("Wrong username or password");
        } else {
            console.log("Validate successfully!");
        }
    } catch (err) {
        console.log(err);
    }
}

// testCreatedUser();
testAuthenticateUser("duc", "123456");