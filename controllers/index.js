const router = require("express").Router();
const users = require("./users/userRoute.js");
const pages = require("./pages/homeRoutes.js");
const post = require("./pages/postRoute.js");
const { route } = require("./users/userRoute.js");

// everything that goes to the pages folder doesnt need anything in the front
router.use('/',pages);

// localhost:3002/users
router.use("/", users);

router.use("/", post);
module.exports = router;