// User model

// Load mongoose 
const mongoose = require("mongoose");

// I don't know why this works
var Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true,
        minlength: 3, // Make sure the username is long enough to be descriptive
        maxlength: 25
    },
    lastname: { 
        type: String, 
        required: true 
    },
    firstname: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    dateOfBirth: Date,
    // Reference: https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose
    profilePic: { 
        data: Buffer, 
        contentType: String
    },
    joinedDate: { 
        type: String, 
        default: Date.now 
    },
    // This is for password
    hash: String,
    salt: String,
    // Administration option
    isAdmin: { 
        type: Boolean, 
        default: false
    },
    // Status option
    isOnline: Boolean,
});

mongoose.model("User", userSchema);

