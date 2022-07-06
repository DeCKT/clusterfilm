const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getUser = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db()
    .collection("users")
    .find({ email: req.params.email });
  result.toArray().then((user) => {
    if (user.length > 0) {
      res.send(user[0]);
    } else {
      res.send(null);
    }
  });
};

const addUser = async (req, res) => {
  const user = {
    email: req.params.email,
  };
  const result = await mongodb.getDb().db().collection("users").insertOne(user);
};

module.exports = {
  getUser,
  addUser,
};
