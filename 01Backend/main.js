const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir("./files", function (err, file) {
    res.render("index", { file: file });
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.tittle.split(" ").join()}.txt`,
    req.body.message,
    () => {
      res.redirect("/");
    }
  );
});


app.get("/files/:filename", (req, res) => {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      res.render("show", { fileName: req.params.filename, filedata: filedata });
    }
  );
});

app.get("/edit/:fileNmae", (req, res) => {
  res.render("edit", { editFileName: req.params.fileNmae });
});

app.post("/edit", (req, res) => {
  fs.rename(`./files/${req.body.preview}`, `./files/${req.body.new}.txt`, (err) => {
    res.redirect("/");
  });
});

app.get("/delete/:fileName", (req, res) => {
  fs.unlink(`./files/${req.params.fileName}`, (err) => {
    res.redirect("/");
  });
});


app.listen(port, () => {
  console.log(`Server run this port ${port}`);
});
