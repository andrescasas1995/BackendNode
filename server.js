const express = require("express");
const bodyParser = require("body-parser");

const response = require("./network/response");

const router = express.Router();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);

router.get("/message", function (req, res){
    res.header({
        "custom-header": "Nuestro valor personalizado"
    });
    console.log(req.headers);
    response.success(req, res, "Lista de mensajes");
});

router.post("/message", function (req, res){
    console.log(req.query);
    console.log(req.body);
    if (req.query.error == "ok") {
        response.error(req, res, "Error simulado", 400, "Simulacion de errores");
    } else {
        response.success(req, res, ("Mensaje \"" + req.body.text + "\" añadido correctamente."), 201);
    }
});
router.delete("/message", function (req, res){
    res.status(201).send({
        error: "",
        message: {
            label: "Eliminado correctamente",
            id: 1
        }
    });
});

// app.use("/", function(req, res) {
//     res.send("Hola");
// });

app.use("/app", express.static("public"));

app.listen(3001);
console.log("La aplicación está escuchando en http://localhost:3001");