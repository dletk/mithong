// Import libraries and packages
const express = require("express");

const config = require("config");

const cors = require("cors");

// Package to help with security
const helmet = require("helmet");

// Create the express app
const app = express();

// Load in all the middlewares needed
app.use(cors());
app.use(helmet());

// Module to print out request details for debugging and development environemt
const morgan = require("morgan");
if (process.env.NODE_ENV == "development") {
    app.use(morgan("dev"));
}

// Using body-parser
const body_parser = require("body-parser");
// These middlewares help to transform the request body into JSON format
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

// Load in the routes
app.use("/", require("./routes/home"));
app.use("/api", require("./routes/api"));

// Get the PORT from the environment
// or using the port 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}.`));

