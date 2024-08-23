const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/auth");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    url: String
});

module.exports = mongoose.model("user", userSchema);

