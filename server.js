const express =require("express");
const controllers = require("./controllers");
// requiring the file
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
// we need to deploy to the server so that it binds to the nearest available port number
const PORT = process.env.PORT || 3002;
const app = express();
const models = require("./models");


// to access the public folder content
app.use(express.static("public"));

// we need the next three lines to use handlebars
const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


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
