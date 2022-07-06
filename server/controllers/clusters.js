const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getClusterById = async (req, res) => {
  let clusterId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("clusters")
    .find({ _id: clusterId });
  result.toArray().then((cluster) => {
    if (cluster.length > 0) {
      res.send(cluster[0]);
    }
  });
};

const getClustersByEmail = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db()
    .collection("clusters")
    .find({ email: req.params.email });
  result.toArray().then((clusters) => {
    res.send(clusters);
  });
};

const newCluster = async (req, res) => {
  const cluster = {
    creator: req.body.email,
    title: req.body.title,
    films: [],
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection("clusters")
    .insertOne(cluster);

  res.send(result);
};

const addFilm = async (req, res) => {
  const clusterId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("clusters")
    .update({ _id: clusterId }, { $push: { films: req.params.film_id } });
};

module.exports = {
  getClusterById,
  getClustersByEmail,
  newCluster,
  addFilm,
};
