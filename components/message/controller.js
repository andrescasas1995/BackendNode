const store = require("./store");

function getMessages(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    });
}

function addMessage(user, message){
    return new Promise((resolve, reject) => {
        if (!user || !message) {
            console.error("[MessageController] No hay usuario o mensaje");
            reject("Los datos son incorrectos");
            return false
        }
        const fullMessage = {
            user: user,
            message: message,
            date: new Date()
        }
        store.add(fullMessage);
        resolve(fullMessage);
    });
}

function updateMessage(id, message){
    return new Promise((resolve, reject) => {
        if (!id || !message) {
            console.error("[MessageController] No hay usuario o mensaje");
            reject("Los datos son incorrectos");
            return false
        }
        const result = store.updateMessage(id, message);
        resolve(result);
    });
}

module.exports = {
    getMessages,
    addMessage,
    updateMessage
}