const express = require("express");
const response = require("./../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/", function (req, res){
    controller.getMessages()
    .then((messageList) => {
        response.success(req, res, messageList, 200);
    })
    .catch(e => {
        response.error(req,res, "Unexpected Error", 500, e);
    })
});

router.post("/", function (req, res){
    controller.addMessage(req.body.user, req.body.message)
    .then((fullMessage) => {
        response.success(req, res, fullMessage);
    })
    .catch( e => {
        response.error(req, res, "Información invalida", 400, "Error en el contenido");
    });
});

router.delete("/", function (req, res){
    res.status(201).send({
        error: "",
        message: {
            label: "Eliminado correctamente",
            id: 1
        }
    });
});

module.exports = router;