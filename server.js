const express =require("express");
const controllers = require("./controllers");
// requiring the file
const sequelize = require("./config/connection");
const PORT = 3002;
const app = express();

// connective tussie between the api and the server
app.use(controllers);

// connect to the database and then run the server
sequelize.sync({}).then(() => {
    app.listen(PORT, () => {
        console.log("on port " + PORT);
    });
})
