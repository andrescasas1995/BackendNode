const db = require("mongoose");
const Model = require("./model");

//mongodb+srv://andrescasas1995:andrescasas1995@cluster0-098rp.mongodb.net/test
db.Promise = global.Promise;
db.connect("mongodb+srv://andrescasas1995:andrescasas1995@cluster0-098rp.mongodb.net/BackendNode",{
    useNewUrlParser: true
});
console.log("[db] Conectada con exito");

async function getMessage(filterUser) {
    let filter = {};
    if (filterUser !== null) {
        filter = { user: filterUser}
    }    
    const messages = await Model.find(filter);
    return messages;
}

function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function updateMessage(id, message) {
    const foundMessage = await Model.findOne({
        _id: id
    });

    foundMessage.message = message;

    const newMessage = await foundMessage.save();
    return newMessage;
}

module.exports = {
    list: getMessage,
    add: addMessage,
    updateMessage: updateMessage
}