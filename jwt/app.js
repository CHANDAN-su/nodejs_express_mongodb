const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

app.use(cookieParser());

app.get("/", (req, res) => {

    // res.cookie("name", "chandan");
    // res.send("done");

    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("cha12@thakur", salt, function(err, hash) {
    //         res.send(hash);
    //     });
    // });

    // bcrypt.compare("cha12@thakur", "$2b$10$k7Y1tPOM037/URlSC8aLbuVL7oB7HvS94v3Va5eefz/14AvJYLdVC", function(err, result) {
    //     console.log(result);
    // });

    let token = jwt.sign({ email: 'chandan7073251686@gmail.com' }, 'chandan');
    res.cookie("token", token);
    res.send("done");

});


app.get("/read", (req, res) => {
    // console.log(req.cookies.name);
    // res.send("hii");

    let data = jwt.verify(req.cookies.token, "chandan");
    console.log(data);
    res.send("hii");

});

app.listen(port, () => {
    console.log(`Server run this port ${port}`);
});