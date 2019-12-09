const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  request(
    "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD",
    function(error, response, body) {
      console.log(body);
    }
  );
  //   console.log(req.body.crypto);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
