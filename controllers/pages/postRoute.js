const router = require("express").Router();
const { emitWarning } = require("process");
const {Post} = require("../../models");


router.post('/home', async (req, res) => {
    if (!req.session.logged_in){
        console.log("no logged in")
        res.redirect('/login');
        return;
    }
    try {
      console.log("inside the sign up post");
        const postData = await Post.create({
            user_id: req.session.user_id,
            title: req.body.title,
            description: req.body.description,
        });
    
      }
     catch (err) {
      res.status(400).json(err);
     }

    
        
    });

    module.exports = router;