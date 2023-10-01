import fs from "fs";
import inquirer from "inquirer";
import qr from "qr-image";

inquirer
  .prompt([
    {
      message: "Enter a url to turn into a QR code.",
      name: "url",
    },
  ])
  .then((answers) => {
    const url = answers.url;
    const qrCode = qr.image(url);
    qrCode.pipe(fs.createWriteStream("QR.png"));

    fs.writeFile("url.text", url, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Promp couldn't be rendered in the current environment");
    }
  });
