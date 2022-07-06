const routes = require("express").Router();

const controller = require("../controllers/user");

routes.get("/:email", controller.getUser);

routes.get("/add/:email", controller.addUser);

module.exports = routes;
