// User model

// Load mongoose 
const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    dateOfBirth: Date,
    email: { type: String, required: true },
    profilePic: { data: Buffer, contentType: String},
    joinedDate: { type: String, default: Date.now },
    // This is for password
    hash: String,
    salt: String,
    // Administration option
    isAdmin: { type: Boolean, default: false},
    // Status option
    isOnline: Boolean,
});

mongoose.model("User", userSchema);

