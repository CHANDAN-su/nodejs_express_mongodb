const express = require("express");
const userModal = require("./Db/db");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  const createUser = await userModal.create({
    name: req.body.name,
    email: req.body.email,
    url: req.body.url,
  });

  res.redirect("/user");
});

app.get("/user", async (req, res) => {
  let users = await userModal.find();
  res.render("user", { users });
});



app.get("/edit/:id", async (req, res) => {
  let user = await userModal.findOne({_id: req.params.id});
  res.render("edit", {user});
});

app.post("/update/:id", async (req, res) => {

  let {name1, email1, url1} = req.body;

  let update = await userModal.findOneAndUpdate({_id: req.params.id}, {name1, email1, url1}, {new: true});
  res.redirect("/user");
  console.log(update);

});

app.get("/delete/:id", async (req, res) => {
  const del = await userModal.findOneAndDelete(req.params.id);

  res.redirect("/user");
});

app.listen(port, () => {
  console.log(`Server run this ${port}`);
});
