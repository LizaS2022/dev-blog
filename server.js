const express =require("express");

const PORT = 3002;
const app = express();


app.listen(PORT, () => {
    console.log("on port " + PORT);
});