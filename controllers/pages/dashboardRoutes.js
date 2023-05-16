const router  = require("express").Router();
const { User, Post } = require("../../models");

// localhost:3002/
   
router.get("/dashboard", async (req, res) => {
    console.log("got to the dashboard get request");
    console.log(req.session);
    
        const postAllData = await Post.findAll({user_id: req.session.user_id}, {
            attributes: [
                "id",
                "title",
                "description",
                "date_created",
            ]
        });
        console.log(postAllData);
        console.log("this is a console log");
        
        
        var actualPostAllData = [];
        if(postAllData){
            for (var i = 0; i < postAllData.length; i++){
                actualPostAllData.push(postAllData[i].dataValues);
            }
        console.log(actualPostAllData);
        }
        return res.render("dashboard",{
            "items": actualPostAllData,
        });
})
router.post('/dashboard', async (req, res) => {
    if (!req.session.logged_in){
        console.log("no logged in")
        return res.redirect('/login');
        
    }
    try {
      console.log("inside the sign up post");
        const postData = await Post.create({
            user_id: req.session.user_id,
            title: req.body.title,
            description: req.body.description,
            date_created: new Date(req.body.date_created),
        });
        return res.status(200).redirect("/dashboard");
      }
      catch (err) {
        res.status(400).json(err);
       }
    });

//localhost:3002/dashboard/id

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