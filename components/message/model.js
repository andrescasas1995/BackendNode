const mongoose = require("mongoose");
const schema = mongoose.Schema;

const mySchema = new schema ({
    user: {
        type: schema.ObjectId,
        ref: "User"
    },
    chat: {
        type: schema.ObjectId,
        ref: "Chat"
    },
    message: {
        type: String,
        require: true
    },
    date: Date,
    file: String
});

const model = mongoose.model("Message", mySchema);
module.exports = model;