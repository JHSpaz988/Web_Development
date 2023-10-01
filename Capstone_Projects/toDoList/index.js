import express, { urlencoded } from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const post = 3000;

let referer = "";

let toDoList = [];
let listHeader = "";

app.use(urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  referer = req.url;
  listHeader = "All tasks:";

  res.render("index.ejs", {
    toDoList: toDoList,
    listHeader: listHeader,
    referer: referer,
  });
});

app.post("/submit", (req, res) => {
  let newToDo = req.body.newToDo;
  toDoList.push(newToDo);

  res.redirect(referer);
});

app.get("/work", (req, res) => {
  referer = req.url;
  listHeader = "Work related task:";

  res.render("index.ejs", {
    listHeader: listHeader,
    referer: referer,
  });
});

app.get("/recent", (req, res) => {
  referer = req.url;
  listHeader = "Today:";

  res.render("index.ejs", {
    listHeader: listHeader,
    referer: referer,
  });
});

app.listen(post, () => {
  console.log(`App listening on port ${post}`);
});
