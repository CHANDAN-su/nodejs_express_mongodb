const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/test`);


const create = mongoose.Schema({
    name: String,
    username: String,
    email: String
});

module.exports =  mongoose.model("user", create);