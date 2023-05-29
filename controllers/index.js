const router = require("express").Router();
const users = require("./users/userRoute.js");
const pages = require("./pages/homeRoutes.js");
// const post = require("./pages/postRoute.js");
const dashboard = require("./pages/dashboardRoutes.js");
const { route } = require("./users/userRoute.js");
const { appendFile } = require("fs");

// everything that goes to the pages folder doesnt need anything in the front
router.use('/',pages);

// localhost:3002/users
router.use("/", users);

router.use("/",dashboard);


// router.use("/", post);
module.exports = router;