const express = require("express");
const cookiesParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModal = require("./model/db");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(cookiesParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/create", (req, res) => {
    let {username, email, password, age} = req.body;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {

            let user = await userModal.create({
                username,
                email,
                password: hash,
                age
            });
        
            var token = jwt.sign({email}, 'shhhhh');
            res.cookie("token", token);
            res.send(token);

        });
    });
});


app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async(req, res) => {
    let user = await userModal.findOne({email: req.body.email1});
    if(!user) return res.send("something a wrong email");
    
    bcrypt.compare(req.body.password1, user.password, function(err, result) {
        if(result){
            var token = jwt.sign({email: user.email}, 'shhhhh');
            res.cookie("token", token);
            res.send("Your are login");
        }else res.send("something a wrong password");
    });
    

});

app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.send("User logout");
});


app.listen(port, () => {
   console.log(`Server run this is port ${port}`) ;
});