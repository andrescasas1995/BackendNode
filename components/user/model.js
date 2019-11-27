const mongoose = require("mongoose");
const schema = mongoose.Schema;

const mySchema = new schema ({
    name: String
});

const model = mongoose.model("User", mySchema);
module.exports = model;