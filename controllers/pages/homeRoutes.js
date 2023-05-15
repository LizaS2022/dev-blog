const router  = require("express").Router();
const { User, Post } = require("../../models");

// localhost:3002/
   
router.get("/login", (req, res) => {
    console.log(" go to login");
    
    if (req.session.logged_in ) {
    res.redirect('/home');
    return;
    }
    res.render("login", {
        title : 'Login',
        title2: "Sign-Up",
    });
});

//localhost:3002/dashboard/id

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

router.get("/home", async (req, res) => {
    console.log("got to the home get request");
    console.log(req.session);
    if (!req.session.logged_in ) {
        res.redirect('/login');
        return;
        }
        const postData = await Post.findAll({user_id: req.session.user_id}, {
            attributes: [
                "id",
                "title",
                "description",
                "date_created",
            ]
        });
        
        const actualPostData = postData.get({plain: true });
        console.log("this is a console log");
        console.log(typeof postData);
        console.log(actualPostData)
        
        res.render("home",{
            "items": actualPostData
        });


})

module.exports = router;