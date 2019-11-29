const store = require("./store");
const socket = require("../../socket").socket;
const config = require("../../config");

function getMessages(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    });
}

function addMessage(chat, user, message, file){
    return new Promise((resolve, reject) => {
        if (!chat || !user || !message) {
            console.error("[MessageController] No hay chat, usuario o mensaje");
            reject("Los datos son incorrectos");
            return false
        }
        let fileUrl = "";
        if (file) {
            fileUrl = `${config.host}:${config.port}${config.publicRoute}${config.fileRoute}/` + file.filename;
        }
        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl
        }
        store.add(fullMessage);
        socket.io.emit("message", fullMessage);
        resolve(fullMessage);
    });
}

function updateMessage(id, message){
    return new Promise((resolve, reject) => {
        if (!id || !message) {
            console.error("[MessageController] No hay id o mensaje");
            reject("Los datos son incorrectos");
            return false
        }
        const result = store.updateMessage(id, message);
        resolve(result);
    });
}

function deleteMessage(id){
    return new Promise((resolve, reject) => {
        if (!id) {
            console.error("[MessageController] No hay usuario o mensaje");
            reject("Los datos son incorrectos");
            return false
        }
        store.remove(id)
        .then(() => {
            resolve();
        })
        .catch(e => {
            reject(e);
        });
    });
}

module.exports = {
    getMessages,
    addMessage,
    updateMessage,
    deleteMessage
}