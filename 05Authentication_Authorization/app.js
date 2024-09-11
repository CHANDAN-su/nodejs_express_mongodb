const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
    
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("cha12@thakur", salt, function(err, hash) {
    //         res.send(hash);
    //     });
    // });

    // bcrypt.compare("cha12@thakur", "$2b$10$SOVSw7ZKuYuqAtAvxxTzDOnYxsdHwz1Lr5APq0aUUDLQYqmPHiu0u", function(err, result) {
    //     console.log(result);
    // });

   let token = jwt.sign({ email: 'chandan@gmail.com'}, 'chandan');
   res.cookie("token", token);
   res.send("done");

});

app.get("/read", (req, res) => {

    let data = jwt.verify(req.cookies.token, 'chandan');
    console.log(data);
    
});


app.listen(3000, () => {
    console.log("Server run port 3000");
});