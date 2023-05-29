const router = require("express").Router();
const { emitWarning } = require("process");
const {User} = require("../../models");



router.get("/login", (req, res) => {
  
  
  if (req.session.logged_in ) {
  return res.redirect("/");
 
  }
  res.render("login", {
      title : 'Login',
      title2: "Sign-Up",
  });
});


// localhost3002/user
router.post("/sign-up", async (req, res)=> {

  try {
  console.log("inside the sign up post");
    const { username, password } = req.body;

    const validateUser = await User.findOne({ username: username});
    if (validateUser){
      return res.status(200).json({message: 'logged in is required'});
      
    }
    const userData = await User.create({
        username: username, 
        password: password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      return res.status(200).json({message: "success"});
     
    });
  }
 catch (err) {
  res.status(400).json(err);
}
    
});



router.post('/login', async (req, res) => {

    try {
      const userData = await User.findOne({ where: { username: req.body.username} });
      if (!userData) {
       return  res.status(400).json({ message: 'Incorrect email or password, please try again' });
       
      }
 
      const validPassword = await userData.checkPassword(req.body.password);

  
      if (!validPassword) {
        return res.status(400).json({ message: 'Incorrect email or password, please try again' });
       
      }


      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        return res.status(200).json({message: "success"});
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
        
      });
      
    } else {
      res.status(404).end();
    }
  });



module.exports = router;