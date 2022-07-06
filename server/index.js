const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const cors = require("cors");

// TODO: Add routes
const movies = require("./routes/movies");
const trending = require("./routes/trending");
const tv = require("./routes/tv");
const search = require("./routes/search");
const user = require("./routes/user");
const cluster = require("./routes/clusters");

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("connected to backend");
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    next();
  })
  .use("/movies", movies)
  .use("/trending", trending)
  .use("/tv", tv)
  .use("/search", search)
  .use("/user", user)
  .use("/cluster", cluster);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
  }
});
