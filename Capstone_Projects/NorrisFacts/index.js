import express from "express";
import axios from "axios";
import { imageKeys } from "./secretKeys.js";

const app = express();
const port = 3000;

const jokesURL = "https://api.chucknorris.io/jokes/random";
const imageURL = "https://api.unsplash.com/photos/random";
const imageHeader = {
  "Accept-Version": "v1",
  Authorization: `Client-ID ${imageKeys.access}`,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const imageParams = {
    query: "martial arts",
  };

  try {
    const jokeResult = await axios.get(jokesURL);
    const imageResult = await axios.get(imageURL, {
      params: imageParams,
      headers: imageHeader,
    });
    res.render("index.ejs", {
      joke: JSON.stringify(jokeResult.data.value),
      imageURL: imageResult.data.urls.small,
      imageDescription: JSON.stringify(imageResult.data.description),
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
