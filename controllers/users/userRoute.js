const router = require("express").Router();
const { emitWarning } = require("process");
const {User} = require("../../models");


// localhost3002/user
router.post("/sign-up", async (req, res)=> {

  try {
  console.log("inside the sign up post");
    const { username, password } = req.body;

    const validateUser = await User.findOne({ username: username});
    console.log(validateUser);
    if (validateUser){
      console.log("validateUser");
      res.redirect("/login");
      return;
    }
    const userData = await User.create({
        username: username, 
        password: password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
    console.log("finished assign")
    res.redirect('/home');
    return;
  }
 catch (err) {
  res.status(400).json(err);
}

    // const userdataDisplay = userData.map((user) => 
    //     user.get({plain:true}));
    //     res.render("login", {userdataDisplay});

    // res.json(userData);
    
});

//localhost:3005/login

router.post('/login', async (req, res) => {
  console.log("in the login post");
    try {
      const userData = await User.findOne({ where: { username: req.body.username} });
      console.log("in the login post 1");
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      console.log("in the login post 2");
      const validPassword = await userData.checkPassword(req.body.password);

      console.log("validPassword" + validPassword);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      console.log("in the login post 3");
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
      });
      console.log("in the login post 4");
      // const userdataDisplay = userData.map((user) => 
      //   user.get({plain:true}));

        res.redirect("/home");
        return;
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