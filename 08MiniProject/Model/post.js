const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
});


module.exports = mongoose.model("post", postSchema)

