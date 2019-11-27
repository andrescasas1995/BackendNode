const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");
const router = require("./network/routers");
db("mongodb+srv://andrescasas1995:andrescasas1995@cluster0-098rp.mongodb.net/BackendNode");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

router(app);

app.use("/app", express.static("public"));

app.listen(3001);
console.log("La aplicación está escuchando en http://localhost:3001");