const Model = require("./model");

async function getUser(filterUser, from, limit) {
    let filter = {};
    if (filterUser !== null) {
        filter = { user: filterUser}
    }    
    const result = {
        users: await Model.find(filter, 'name').skip(from).limit(limit),
        count: await Model.find(filter).count()
    }

    return result;
}

function addUser(user) {
    const myUser = new Model(user);
    myUser.save();
}

async function updateUser(id, name) {
    const foundUser = await Model.findOne({
        _id: id
    });

    foundUser.name = name;

    const newUser = await foundUser.save();
    return newUser;
}

async function removeUser(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    list: getUser,
    add: addUser,
    update: updateUser,
    remove: removeUser
}