const router = require("express").Router();
const config = require("config");

// The route for homepage, send the message to front end
router.get(["/home", "/"], (req, res) => {
    res.send({message: `Welcome to ${config.get("name")}, a networking project by Big44every1.`});
})

module.exports = router;