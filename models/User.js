// User model

// Load mongoose 
const mongoose = require("mongoose");
const {Schema} = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    lastname: String,
    firstname: String,
    dateOfBirth: Date,
    email: String,
    joinedDate: {type: String, default: Date.now}
});

mongoose.model("User", userSchema);

