import express from "express";
import axios from "axios";
import { userInfo } from "./secretKeys.js";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = userInfo.name;
const yourPassword = userInfo.password;
const yourAPIKey = userInfo.key;
const yourBearerToken = userInfo.token;

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", (req, res) => {
  axios
    .get(`${API_URL}random`)
    .then(function (response) {
      const data = JSON.stringify(response.data);
      res.render("index.ejs", { content: data });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/basicAuth", (req, res) => {
  axios
    .get(`${API_URL}all`, {
      auth: {
        username: userInfo.name,
        password: userInfo.password,
      },
      params: {
        page: "2",
      },
    })
    .then(function (response) {
      const data = JSON.stringify(response.data);
      res.render("index.ejs", { content: data });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/apiKey", (req, res) => {
  axios
    .get(`${API_URL}filter`, {
      params: {
        apiKey: userInfo.key,
        score: "5",
      },
    })
    .then(function (response) {
      const data = JSON.stringify(response.data);
      res.render("index.ejs", { content: data });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/bearerToken", (req, res) => {
  axios
    .get(`${API_URL}secrets/42`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
    .then(function (response) {
      const data = JSON.stringify(response.data);
      res.render("index.ejs", { content: data });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
