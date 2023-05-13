const express =require("express");
const routes = require("./routes");
const PORT = 3002;
const app = express();

// connective tussie between the api and the server
app.use(routes);

app.listen(PORT, () => {
    console.log("on port " + PORT);
});