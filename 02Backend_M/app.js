const express = require("express");
const app = express();


const userModel = require("./userModel");

app.get("/", (req, res) => {
    res.send("hey");
});

// user create
app.get("/create", async (req, res) => {
    let createUser = await userModel.create({
        name: "ravi",
        email: "ravi9116690334@gmail.com",
        username: "Vasco"
    });
    res.send(createUser);
});


// user update
app.get("/update", async (req, res) => {
    let createUser = await userModel.findOneAndUpdate({username: "Tony stak"}, {name: "chandan thakur"}, {new: true});
    res.send(createUser);
});


// all user find
app.get("/read", async (req, res) => {
    let createUser = await userModel.find();
    res.send(createUser);
});

// one user
app.get("/Oneread", async (req, res) => {
    let createUser = await userModel.findOne({name: "ravi"});
    res.send(createUser);
});


// user delete
app.get("/delete", async (req, res) => {
    let createUser = await userModel.findOneAndDelete({name: "ravi"});
    res.send(createUser);
});


app.listen(3000, () => {
    console.log("Server run");
});