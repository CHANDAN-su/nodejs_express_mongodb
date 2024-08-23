const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/authtestuser");

let userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: String
});

module.exports = mongoose.model("user", userSchema);
