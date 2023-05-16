const router = require("express").Router();
const { emitWarning } = require("process");
const {Post} = require("../../models");

// router.get("/dashboard/:user_id", async (req,res) => {
// const userData = await User.findByPk(req.params.user_id, {
//     attributes: [
//         "username",
//         "email",
//     ]
// });

// const actualUserData = userData.get({plain: true });
// console.log(actualUserData);
// res.render("dashboard",actualUserData);
// })


module.exports = router;