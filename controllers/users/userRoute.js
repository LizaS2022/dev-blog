const router = require("express").Router();
const { emitWarning } = require("process");
const {User} = require("../../models");



router.get("/login", (req, res) => {
  
  console.log(" go to login");
  
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
    console.log(validateUser);
    if (validateUser){
      console.log("validateUser");
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

   
    console.log("finished assign")
  
  }
 catch (err) {
  res.status(400).json(err);
}
    
});

//localhost:3005/login

router.post('/login', async (req, res) => {
  console.log("in the login post");
    try {
      const userData = await User.findOne({ where: { username: req.body.username} });
      console.log("in the login post 1");
      if (!userData) {
       return  res.status(400).json({ message: 'Incorrect email or password, please try again' });
       
      }
      console.log("in the login post 2");
      const validPassword = await userData.checkPassword(req.body.password);

      console.log("validPassword" + validPassword);
  
      if (!validPassword) {
        return res.status(400).json({ message: 'Incorrect email or password, please try again' });
       
      }

      console.log("in the login post 3");
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        return res.status(200).json({message: "success"});
      });
      console.log("in the login post 4");
      // const userdataDisplay = userData.map((user) => 
      //   user.get({plain:true}));
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      console.log("logged in in the logout post")
      req.session.destroy(() => {
        res.status(204).end();
        
      });
      
    } else {
      res.status(404).end();
    }
  });



module.exports = router;