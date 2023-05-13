const express =require("express");
const controllers = require("./controllers");
// requiring the file
const sequelize = require("./config/connection");
const PORT = process.env.PORT || 3002;
const app = express();
const models = require("./models");


// this is needed to do post requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// connective tussie between the api and the server
app.use(controllers);

// connect to the database and then run the server
sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => {
        console.log("on port " + PORT);
    });
})
