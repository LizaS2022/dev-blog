const router = require("express").Router();
const { emitWarning } = require("process");
const {Post, Comment, User} = require("../../models");


router.get('/', async (req, res) => {
     if (!req.session.logged_in){
        return res.redirect('/login');
    }
   
    try{
        const postData = await Post.findAll({
            where: {user_id: req.session.user_id}, 
            include: [{
                model:Comment,
                attributes: ["comment_text","date_created","comment_id"],
            }],
            attributes: [
                "post_id",
                "title",
                "description",
                "date_created",
            ]
        });

        const username = await User.findOne({
            where: {id: req.session.user_id},
            attributes: ["username"],
        }).value



        var postDataAll = [];
        postData.forEach(post => {
            postDataAll.push(post.get({ plain: true }));
        });

        console.log("the post data all" +postDataAll[0].comments);

        


        console.log(req.session.logged_in);
        res.status(200).render("home",{
            postsAndComments: postDataAll,
            user: username,
            logged_in: req.session.logged_in,
        });
    }
catch(err) {
    console.log(err);
    res.status(500).json(err);
}
});


router.post('/', async (req, res) => {
    // if (!req.session.logged_in){
    //     return res.redirect('/login');
    // }
    try {
        const postData = await Post.create({
            user_id: req.session.user_id,
            title: req.body.title,
            description: req.body.description,
        });

        return res.status(200).json({message: "succeeded"});
      }
     catch (err) {
      res.status(400).json(err);
     }
    });

    router.post('/comments/save',async (req, res) => {
        
        if (!req.session.logged_in){
            return res.status(401).json({message: "user not logged in"});
        }
        
    try {
        const replyToPost = await Comment.create(
            {
                comment_text: req.body.comment_text,
                user_id: req.session.user_id,
                post_id: req.body.post_id,
                
            }, 
        );
        console.log("the added comment is:" + replyToPost);
        if (!replyToPost) {
            return res.status(404).json("comment not found");
        }
        return res.status(200).json(replyToPost)
    }
    
    catch(error) {
        return res.status(500).json({error:error.message});
    }
    });
    
  
    module.exports = router;