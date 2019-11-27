const store = require("./store");

function getUser(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    });
}

function addUser(name){
    return new Promise((resolve, reject) => {
        if (!name) {
            console.error("[UserController] No hay nombre");
            reject("Los datos son incorrectos");
            return false
        }
        const user = {
            name
        }
        store.add(user);
        resolve(user);
    });
}

function updateUser(id, name){
    return new Promise((resolve, reject) => {
        if (!id || !name) {
            console.error("[UserController] No hay id o nombre");
            reject("Los datos son incorrectos");
            return false
        }
        const result = store.update(id, name);
        resolve(result);
    });
}

function deleteUser(id){
    return new Promise((resolve, reject) => {
        if (!id) {
            console.error("[UserController] No hay usuario o mensaje");
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
    getUser,
    addUser,
    updateUser,
    deleteUser
}