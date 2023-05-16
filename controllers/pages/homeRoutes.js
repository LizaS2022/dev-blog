const router = require("express").Router();
const { emitWarning } = require("process");
const {Post} = require("../../models");


router.get("/home", async (req, res) => {
    console.log("got to the home get request");
    console.log(req.session);
    if (!req.session.logged_in ) {
        return res.redirect('/login');
        
        }
        const postData = await Post.findAll({user_id: req.session.user_id}, {
            attributes: [
                "id",
                "title",
                "description",
                "date_created",
            ]
        });
        console.log(postData);
        // const actualPostData = postData.get({plain: true });
        console.log("this is a console log");
        console.log(typeof postData);
        console.log(postData)
        
        var actualPostData = [];
        if(postData){
            for (var i = 0; i < postData.length; i++){
                actualPostData.push(postData[i]["dataValues"]);
            }
        console.log(actualPostData);
        }
        return res.render("home",{
            "items": actualPostData,
        });


})


router.post('/home', async (req, res) => {
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
        });
        return res.status(200).redirect("/home");
      }
     catch (err) {
      res.status(400).json(err);
     }

    
        
    });

    module.exports = router;