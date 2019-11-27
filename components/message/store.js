const Model = require("./model");

async function getMessage(filterUser) {
    return new Promise((resolve, reject) => {        
        let filter = {};
        if (filterUser !== null) {
            filter = { user: filterUser}
        }    
        const messages = Model.find(filter)
        .populate("user")
        .catch(e => {
            reject(e);
        });
        resolve(messages);
    });
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

async function removeMessage(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    list: getMessage,
    add: addMessage,
    updateMessage: updateMessage,
    remove: removeMessage
}