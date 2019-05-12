// Import libraries and packages
const express = require("express");
// Packages to help with validation
const Joi = require("joi");

const config = require("config");

// Package to help with security
const helmet = require("helmet");



// Create the express app
const app = express();

// Load in all the middlewares needed
app.use(helmet());
// These middlewares help to transform the request body into JSON format
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Load in the routes
app.use("/", require("./routes/home"));

// Get the PORT from the environment 
// or using the port 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}.`));