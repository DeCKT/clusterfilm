const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const cors = require("cors");

// TODO: Add routes
const movies = require("./routes/movies");

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("connected to backend");
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/movies", movies);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
  }
});
