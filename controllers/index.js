const router = require("express").Router();
const users = require("./users");

// localhost:3002/users
router.use("/users", users);

module.exports = router;