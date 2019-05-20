const mongoose = require("mongoose");

// Use the debugger as follow in terminal: DEBUG=model:user nodemon/node/... testUser.js
const debug_model_user = require("debug")("model:user");


require("./User");

const User = mongoose.model("User");


function testUser() {
    var duc = User({ username: "duc", lastname: "Le", firstname: "Duc", email: "duclmas@gmail.com" });

    duc.setPassword("123456");

    console.log(duc);

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
    }, 100);
}

testUser()