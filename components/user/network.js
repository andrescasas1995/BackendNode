const express = require("express");
const response = require("./../../network/response");
const controller = require("./controller");
const config = require("../../config");
const router = express.Router();
const auth = require("express-jwt");
const bcrypt = require("bcrypt");

router.get("/", auth(config.auth), function (req, res){
    const filterUser = req.query.name || null;
    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;
    let cryp = bcrypt.hashSync("andres", 10);
    console.log(cryp);
    console.log(bcrypt.compareSync("andre",cryp));
    console.log(bcrypt.compareSync("andres",cryp));
    
    controller.getUser(filterUser, from, limit)
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