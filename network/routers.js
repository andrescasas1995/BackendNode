const express = require("express");
const message = require("../components/message/network");

const routers = function(server) {
    server.use("/message", message)
}

module.exports = routers;