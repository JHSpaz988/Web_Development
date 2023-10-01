import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Hello, World!</h1><ul><li>Phone#:</li><li>Address:</li></ul>");
});

app.get("/about", (req, res) => {
  res.send(
    "<h1>This is a page about me!</h1><p>This paragraph contains information about; me, myself, and I.</p>"
  );
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}.`);
});
