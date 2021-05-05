const { isValid, format } = require("date-fns");
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get(
  "/api/:date?",
  (req, res, next) => {
    const date = req.params.date;
    req.date = date
      ? new Date(Number.isNaN(Number(date)) ? date : Number(date))
      : new Date();
    next();
  },
  (req, res) => {
    if (isValid(req.date)) {
      res.json({
        unix: req.date.getTime(),
        utc: format(req.date, "EEE',' dd MMM YYYY HH:mm:ss OOO"),
      });
    } else {
      res.json({ error: req.date });
    }
  }
);

const listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
