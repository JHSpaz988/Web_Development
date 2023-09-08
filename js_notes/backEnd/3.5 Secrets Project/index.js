import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

var userAuthorized = false;
function passwordAuthentication(req, res, next) {
  if (req.body.password === "ILoveProgramming") {
    userAuthorized = true;
  } else {
    userAuthorized = false;
  }
  next();
}
app.use(passwordAuthentication);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (userAuthorized) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.redirect("/failed");
  }
});

app.get("/failed", (req, res) => {
  res.send("<h1>You've failed to get my seccrets!</h1>");
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
