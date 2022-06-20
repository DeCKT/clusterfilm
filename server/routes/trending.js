const routes = require("express").Router();

const controller = require("../controllers/trending");

routes.get("/", controller.getFirst);

module.exports = routes;
