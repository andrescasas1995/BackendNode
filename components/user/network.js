const express = require("express");
const response = require("./../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/", function (req, res){
    const filterUser = req.query.name || null;
    controller.getUser(filterUser)
    .then((userList) => {
        response.success(req, res, userList, 200);
    })
    .catch(e => {
        response.error(req,res, "Unexpected Error", 500, e);
    })
});

router.post("/", function (req, res){
    controller.addUser(req.body.name)
    .then((user) => {
        response.success(req, res, user);
    })
    .catch( e => {
        response.error(req, res, "Información invalida", 400, "Error en el contenido");
    });
});

router.patch("/:id", function (req, res){
    controller.updateUser(req.params.id, req.body.name)
    .then((data) => {
        response.success(req, res, data);
    })
    .catch( e => {
        response.error(req, res, "Error interno", 500, e);
    });
});

router.delete("/:id", function (req, res){
    controller.deleteUser(req.params.id)
    .then((data) => {
        response.success(req, res, `Usuario ${req.params.id} eliminado`);
    })
    .catch( e => {
        response.error(req, res, "Error interno", 500, e);
    });
});

module.exports = router;