const router = require("express").Router();


// localhost:3002/
router.get('/', (req,res) => {
    res.json("HI!");
})

module.exports = router;