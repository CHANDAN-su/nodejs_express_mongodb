const express = require("express");
const app = express();
const port = 3000;
const userModel = require("./models/user");
const postModel = require("./models/post");


app.get("/", (req, res) => {
    res.send("hey");
});

app.get("/create", async (req, res) => {
    let userCreate = await userModel.create({
        username: "chandan",
        email: "abc@gmail.com",
        age: 22
    });

    res.send(userCreate);

});

app.get("/post/create", async (req, res) => {

   let userpost = await postModel.create({
        postdata: "Nice pic",
        user: "66c8e5da971b78368fb5980b",  
    });

    let user = await userModel.findOne({_id: "66c8e5da971b78368fb5980b"});
    user.post.push(userpost._id);
    await user.save();

    res.send({userpost, user});
});

app.listen(port, () => {
    console.log(`Server run this port ${port}`);
});