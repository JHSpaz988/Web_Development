import axios from "axios";
import express from "express";

const app = express();
const port = 3000;

const url = "https://secrets-api.appbrewery.com/random";

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(url);
    res.render("index.ejs", {
      secret: JSON.stringify(result.data.secret),
      user: JSON.stringify(result.data.username),
    });
  } catch (err) {
    res.render("index.ejs", { secret: JSON.stringify(err.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
