const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

var app = express();
app.use(bodyParser.json());
app.use(router);

router.get("/message", function (req, res){
    res.send("Lista de mensajes");
});

router.post("/message", function (req, res){
    console.log(req.query);
    console.log(req.body);
    res.send("Mensaje \"" + req.body.text + "\" añadido correctamente." );
});

// app.use("/", function(req, res) {
//     res.send("Hola");
// });

app.listen(3001);
console.log("La aplicación está escuchando en http://localhost:3001");