const express = require("express");
const app = express();
const userModel = require("./Model/user");
const postModel = require("./Model/post");
const bcrypt = require("bcrypt");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const upload = require("./config/multerCOnfig");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/profilePic", isLogged, (req, res) => {
    res.render("profilePic");
});

app.post("/upload", isLogged, upload.single('image'), (req, res) => {
    const email = req.user.email;
    console.log(email);
});


app.get("/", (req, res) => {
    res.render("index");
});

app.post("/create", async (req, res) => {

    const { username, name, age, email, password } = req.body;
    
    let userfind = await userModel.findOne({email});
    if(userfind) return res.status(300).send("User alerady register");

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            const user = await userModel.create({
                username,
                name,
                age,
                email,
                password: hash
            });

            var token = jwt.sign({ email: email, userid: user._id }, 'shhhhh');
            res.cookie("token", token);
            res.redirect("/profile");

        });
    });

});

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const finedUser = await userModel.findOne({email});
    if(!finedUser) return res.status(404).send("Something went wrong");

    bcrypt.compare(password, finedUser.password , function(err, result) {
        console.log(result);
        if(result) return res.redirect("/profile");
        else {
            res.redirect("/login");
        }
    });

    var token = jwt.sign({ email: email, userid: finedUser._id }, 'shhhhh');
            res.cookie("token", token);

});

app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect("/login")
});

function isLogged(req, res, next){
    if(req.cookies.token === "") res.redirect("/login");
    else{
        let data = jwt.verify(req.cookies.token, 'shhhhh');
        req.user = data;
        next();
    }
}

app.get("/profile", isLogged, async (req, res) => {
    const email = req.user.email;
    const user = await userModel.findOne({email}).populate("post");
    res.render("profile", {user: user});
    // console.log(user);
});

app.post("/post", isLogged, async (req, res) => {

    const {content} = req.body;
    const email = req.user.email;
    const user = await userModel.findOne({email});

    const postUser = await postModel.create({
        username: user._id,
        content
    });

    user.post.push(postUser._id);
    await user.save();

    res.redirect("/profile")

});

// app.get("/allpost", isLogged, async (req, res) => {

//     const user = await postModel.find().populate("username");    
//     res.render("allpost", {user});
    
// });

app.get("/like/:id", isLogged, async (req, res) => {

    const id = req.params.id;
    const post = await postModel.findOne({_id: id}).populate("username");

    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
    }else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1)
    }

    await post.save();

    res.redirect("/profile");

});

app.get("/edit/:id", isLogged,  async (req, res) => {

    const post = await postModel.findOne({_id: req.params.id}).populate("username");
    res.render("edit", {post});   

});

app.post("/update/:id", isLogged,  async (req, res) => {

    const post = await postModel.findOneAndUpdate({_id: req.params.id}, {content: req.body.content}, {new: true});
    res.redirect("/profile");
});

app.listen(5000, () => {
    console.log(`Server run this ${5000}`);
});













// // file upload method
// const multer = require("multer");
// const crypto = require("crypto");


// // file upload method
// // crypto.randomBytes(12, function (err, bytes){
// //     console.log(bytes.toString("hex"));
// // });

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/image/upload');
//     },
//     filename: function (req, file, cb) {
//       crypto.randomBytes(12, function (err , bytes){
//         const fn = bytes.toString("hex") + path.extname(file.originalname);
//         cb(null, fn)
//       });
//     }
//   })
  
//   const upload = multer({ storage: storage })


// app.get("/test", (req,res) => {
//     res.render("test");
// });

// // file uplaod router
// app.post("/upload", upload.single('image'), (req, res) => {
//     console.log(req.body);
//     console.log(req.file);
//     res.redirect("/test");
// });