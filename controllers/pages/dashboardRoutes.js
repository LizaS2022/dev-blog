const router  = require("express").Router();
const { Router } = require("express");
const { User, Post } = require("../../models");

// localhost:3002/
   
router.get('/dashboard', async (req, res) => {
    if (!req.session.logged_in){
        return res.redirect('/login');
    }

        const postAllData = await Post.findAll({user_id: req.session.user_id}, {
            attributes: [
                "id",
                "title",
                "description",
                "date_created",
            ]
        });
  
        var actualPostAllData = [];
        if(postAllData){
            for (var i = 0; i < postAllData.length; i++){
                actualPostAllData.push(postAllData[i].get({plain:true}));
            }
        }
        return res.status(200).render("dashboard",{
            "items": actualPostAllData,
        });
});
router.post('/dashboard', async (req, res) => {
    if (!req.session.logged_in){
        return res.status(401).json({message: "user not logged in"});
    }
    try {
        
      console.log("inside the sign up post");
        const postData = await Post.create({
            user_id: req.session.user_id,
            title: req.body.title,
            description: req.body.description,
            // date_created: new Date(req.body.date_created),
        });
        return res.status(200).json({message:"success"});
      }
      catch (err) {
        res.status(400).json(err);
       }
    });

router.delete('/dashboard/:id', async (req, res) => {
    console.log("im in")
    if (!req.session.logged_in){
        return res.status(401).json({message: "user not logged in"});
    }

    try {
    const postData = await Post.destroy({
        where: {
        id: req.params.id,
        user_id: req.session.user_id,
        },
    });
    console.log("the post data of the delete requst:" + postData);
    if (!postData) {
        return res.status(404).json({ message: 'No post found with this id!' });
        
    }

    res.status(200).json(postData);
    } catch (err) {
    res.status(500).json(err);
    }
});


router.put('/dashboard/:id',async (req, res) => {
    console.log("the req parmas id is " + req.params.id);
    console.log("the req parmas user_id " + req.session.user_id);
    console.log(req.body);
    console.log("edit put request")
    if (!req.session.logged_in){
        return res.status(401).json({message: "user not logged in"});
    }
    
    console.log(req.session.user_id);
try {
    const updatedPost = await Post.update (

        {
            title:req.body.title,
            description:req.body.description,
        }, 
        {
        where: {
            id: req.params.id,
            user_id:req.session.user_id,
            },
           
    }
    );
    console.log("the updated post is:" + updatedPost);
    if (!updatedPost) {
        return res.status(404).json("post not found");
    }
    return res.status(200).json(updatedPost)
}

catch(error) {
    return res.status(500).json("error");
}
});
    

module.exports = router;