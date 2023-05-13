const router  = require("express").Router();
const { User } = require("../../models");

//localhost:3002
router.get("/", (req,res) => {
    res.render("homepage");
})

//localhost:3002/dashboard

router.get("/dashboard/:user_id", async (req,res) => {
    const userData = await User.findByPk(req.params.user_id, {
        attributes: [
            "username",
            "email",
        ]
    });
    
    const actualUserData = userData.get({plain: true });
    console.log(actualUserData);
    res.render("dashboard",actualUserData);
})

module.exports = router;