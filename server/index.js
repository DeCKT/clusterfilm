const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const cors = require("cors");

// TODO: Add routes

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()).use((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
  }
});
