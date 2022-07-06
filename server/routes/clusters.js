const routes = require("express").Router();

const controller = require("../controllers/clusters");

routes.post("/new", controller.newCluster);

routes.get("/:id", controller.getClusterById);

routes.get("/user/:email", controller.getClustersByEmail);

routes.put("/:id/add/:film_id", controller.addFilm);

module.exports = routes;
