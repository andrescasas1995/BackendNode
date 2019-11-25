const mongoose = require("mongoose");
const schema = mongoose.Schema;

const mySchema = new schema ({
    user: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    date: Date
});

const model = mongoose.model("Message", mySchema);
module.exports = model;