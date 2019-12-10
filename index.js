const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var finalURL = baseURL + crypto + fiat;
  request(finalURL, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.last;
    var currentDate = data.display_timestamp;
    var displayText =
      "<h1>The current price of " +
      crypto +
      " is " +
      price +
      " " +
      fiat +
      "</h1>";
    res.write("<p>The current date is " + currentDate + "</p>");
    res.write(displayText);
    res.send();
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
