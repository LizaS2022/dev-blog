const router = require("express").Router();
const users = require("./users");
const pages = require("./pages");
const { route } = require("./users");

// everything that goes to the pages folder doesnt need anything in the front
router.use('/',pages);

// localhost:3002/users
router.use("/users", users);

module.exports = router;