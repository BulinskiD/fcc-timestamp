// server.js
// where your node app starts

// init project
const { isValid } = require("date-fns");
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get(
  "/api/:date?",
  (req, res, next) => {
    const date = req.params.date;
    if (date) {
      req.date = new Date(date);
    } else {
      req.date = new Date();
    }
    next();
  },
  (req, res) => {
    if (isValid(req.date)) {
      res.json({ unix: req.date.getTime(), utc: req.date.toString() });
    } else {
      res.json({ error: req.date.toString() });
    }
  }
);

const listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
