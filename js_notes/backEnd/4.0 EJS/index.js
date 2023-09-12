import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // Create weekday list
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get day of week const
  const todayNum = new Date();
  // Convert todayNum to dayOfWeek using weekday list
  var dayOfWeek = weekday[todayNum.getDay()];
  // Get mood/advice
  let mood = "";
  if (todayNum > 0 && todayNum < 6) {
    mood = "work hard!";
  } else {
    mood = "have some fun!";
  }
  res.render(__dirname + "/views/index.ejs", { day: dayOfWeek, mood: mood });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
