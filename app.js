const express = require("express");
const mainRouter = require("./Routes/MainRouter");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(mainRouter);
var port = process.env.PORT || 5000;
app.listen(port);
console.log("App Started Successfully! " + port);
