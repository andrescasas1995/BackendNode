const express = require("express");
const multer = require("multer");
const response = require("./../../network/response");
const controller = require("./controller");
const router = express.Router();
const config = require("../../config");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public${config.fileRoute}/`)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
    }
});
  
const upload = multer({ storage: storage });

router.get("/", function (req, res){
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages)
    .then((messageList) => {
        response.success(req, res, messageList, 200);
    })
    .catch(e => {
        response.error(req,res, "Unexpected Error", 500, e);
    })
});

router.post("/", upload.single("file"), function (req, res){
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then((fullMessage) => {
        response.success(req, res, fullMessage);
    })
    .catch( e => {
        response.error(req, res, "Información invalida", 400, e);
    });
});

router.patch("/:id", function (req, res){
    controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
        response.success(req, res, data);
    })
    .catch( e => {
        response.error(req, res, "Error interno", 500, e);
    });
});

router.delete("/:id", function (req, res){
    controller.deleteMessage(req.params.id)
    .then((data) => {
        response.success(req, res, `Usuario ${req.params.id} eliminado`);
    })
    .catch( e => {
        response.error(req, res, "Error interno", 500, e);
    });
});

module.exports = router;