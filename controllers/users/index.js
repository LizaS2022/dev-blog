const router = require("express").Router();
// i am going to require the user table from the models model
const {User} = require("../../models");


// localhost3002/users
router.get('/', (req, res)=> {
    res.json("From the user folder!");
})


// i want to write  post request that will create a new user
// localhost:3002/users/sign-up
router.post("/sign-up", async (req, res)=> {
    const { username, email, password } = req.body;
    const userData = await User.create({
        username: username, 
        email: email,
        password: password,
    })
    res.json(userData);
});



module.exports = router;