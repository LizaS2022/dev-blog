const router = require("express").Router();
const routes = require("./controllers");

router.use("/", routes);


module.exports = router;